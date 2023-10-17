const crypto = require("crypto");
const { getSupabase } = require("../DataBase/DBConnection");
const jwt = require("jsonwebtoken");

exports.postRatingCommentToSpecificProduct = async (req, res, next) => {
  try {
    let { Product_ID, Business_Name } = req.body;
    console.log(req.body);
    const { Rating, Comment } = req.body.Review;
    if (!RatingCommentIsEmpty(req)) {
      let Review_ID = generateUniqueToken();
      while (Review_ID <= 0) {
        Review_ID = generateUniqueToken();
      }
      insertReview(
        Review_ID,
        Rating,
        Review_ID,
        Comment,
        Business_Name,
        req.userId,
        Product_ID
      );
      if (insertUser(req.userId, Review_ID)) {
        res.status(500).json({ error: error.message });
      }
      return res.status(201).json({ Message: "Successfully" });
    } else {
      return res.status(400).json({ Message: "Must Fill all information" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.postReport = async (req, res, next) => {
  let { Name, Email, Subject, Comment } = req.body;

  if (!ReportIsEmpty(Name, Email, Subject, Comment)) {
    insertReports(req.userId, Name, Email, Subject, Comment);
    return res.status(201).json({ Message: "Successfully" });
  } else {
    return res.status(400).json({ Message: "Must Fill all information" });
  }
};

exports.getUserName = (req, res, next) => {
  res.json({
    name: "Dummy User",
  });
};
function generateUniqueToken() {
  const token = crypto.randomBytes(8).readInt16LE(0, 8);
  return token;
}

function RatingCommentIsEmpty(req) {
  const User_ID = req.params.User_ID;
  let { Product_ID, Business_Name } = req.body;
  const { Rating, Comment } = req.body.Review;
  if (
    User_ID == "" ||
    Product_ID == "" ||
    Business_Name == "" ||
    Rating == "" ||
    Comment == ""
  ) {
    return true;
  }
}

function ReportIsEmpty(User_ID, Name, Email, Subject, Comment) {
  if (
    User_ID == "" ||
    Name == "" ||
    Email == "" ||
    Subject == "" ||
    Comment == ""
  ) {
    return true;
  }
}

async function insertUser(User_ID, Review_ID) {
  const { error } = await getSupabase().from("UserTest").insert([
    {
      User_ID,
      Review_ID,
    },
  ]);
  if (error) {
    return true;
  }
}

async function insertReview(
  Review_ID,
  Rating,
  Review_ID,
  Comment,
  Business_Name,
  User_ID,
  Product_ID
) {
  const { error2 } = await getSupabase().from("Review").insert([
    {
      Review_ID,
      Rating,
      Review_ID,
      Comment,
      Business_Name,
      User_ID,
      Product_ID,
    },
  ]);
  if (error2) {
    return res.status(500).json({ error: error.message });
  }
}

async function insertReports(User_ID, Name, Email, Subject, Comment) {
  const { error } = await getSupabase().from("Reports").insert([
    {
      User_ID,
      Name,
      Email,
      Subject,
      Comment,
    },
  ]);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.getSections = async (req, res, next) => {
  const { data, error } = await getSupabase().from("Sections").select("*");
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};

exports.getFavorites = async (req, res, next) => {
  const { data, error } = await getSupabase()
    .from("Favorites")
    .select(`Person_ID, Product_ID, Product (Product_ID, Business_Name, Description, Product_Name, Price, Primary_Image)`)
    .eq("Person_ID", req.userId);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
  next();
};

exports.addFavorite = async (req, res, next) => {
  const Product_ID = req.params.id;
  const { data, error } = await getSupabase()
    .from("Favorites")
    .insert({ Person_ID: req.userId, Product_ID: Product_ID });
  if (error) {
    res.status(500).send(error);
  } else {
    res.status(200).json("Success");
  }
};

exports.removeFavorite = async (req, res, next) => {
  const Product_ID = req.params.id;
  console.log(Product_ID);
  const { data, error } = await getSupabase()
    .from("Favorites")
    .delete()
    .eq("Person_ID", req.userId)
    .eq("Product_ID", Product_ID);
  if (error) {
    res.status(500).send({ Message: error });
  } else {
    res.status(200).json({ Message: "Success" });
  }

};

exports.getRecommendationProducts = async (req, res) => {
  try {
    let Person_ID = req.userId;
    let queryUser = getSupabase()
      .from("Person")
      .select("Address")
      .match({ Person_ID })
      .single();

    const { data: dataUser, errorUser } = await queryUser;
    const LocationOfBusiness = dataUser.Address;

    let queryBusiness = getSupabase()
      .from("BusinessOwner")
      .select("*")
      .eq("LocationOfBusiness", LocationOfBusiness);

    const { data: businessOwners, errorBusiness } = await queryBusiness;
    if (errorBusiness) {
      res.status(500).json({ error: error.message });
    }
    let queryProduct = getSupabase().from("Product").select("*");
    const { data: data, error } = await queryProduct;
    if (error) {
      res.status(500).json({ error: error.message });
    }
    const cheapProducts = data;
    productsWithImages = [{ data: cheapProducts }];

    const businessesMap = new Map();
    // linking products to their respective business owners

    linkingProductsWithCorrespondBusinessOwner(
      productsWithImages,
      businessesMap
    );

    // Convert the map of businesses to List
    const FilterProduct = [];
    convertBusinessMapToList(businessesMap, FilterProduct);

    const commonProducts = FilterProduct.reduce((acc, cur) => {
      const { name, products } = cur;
      const matchingProducts = businessOwners.filter(
        (product) => product.Business_Name === name
      );
      if (matchingProducts.length) {
        acc.push({ name, products });
      }
      return acc;
    }, []);
    res.status(200).json({ recommendationProducts: commonProducts });

  } catch (error) {
    res.status(400).json({ Message: "Bad request" });
  }
};

function linkingProductsWithCorrespondBusinessOwner(
  productsWithImages,
  businessesMap
) {
  for (const product of productsWithImages) {
    for (var i = 0; i < product.data.length; i++) {
      const businessName = product.data[i].Business_Name;

      if (!businessesMap.has(businessName)) {
        businessesMap.set(businessName, []);
      }
      businessesMap.get(businessName).push({
        id: product.data[i].Product_ID,
        name: product.data[i].Product_Name,
        description: product.data[i].Description,
        price: product.data[i].Price,
        Primary_Image: product.data[i].Primary_Image,
      });
    }
  }
}

function convertBusinessMapToList(businessesMap, FilterProduct) {
  for (const [businessName, products] of businessesMap) {
    FilterProduct.push({
      name: businessName,
      products: products,
    });
  }
}
exports.getBusinessOwnerProducts = async (req, res, next) => {
  const Business_Name = req.params.name;
  const { data, error } = await getSupabase()
    .from("Product")
    .select("*")
    .eq("Business_Name", Business_Name);
  if (error) {
    res.status(500).json({ error: error.message });
  } else if (data.length == 0) {
    res.status(404).json({ error: "No results found" });
  } else {
    res.status(200).json(data);
  }
};
