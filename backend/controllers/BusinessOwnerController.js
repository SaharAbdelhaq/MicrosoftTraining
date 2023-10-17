const jwt = require("jsonwebtoken");
const { getSupabase } = require("../DataBase/DBConnection");
const imageUploader = require("../Cloudinary/upload-image");

exports.getBusinessOwnerName = (req, res, next) => {
  res.json({
    name: "Omar Salous",
  });
};

exports.postBusinessOwnerRegister = async (req, res, next) => {
  console.log("req.body ***********");

  console.log(req.body);
  const {
    First_Name,
    Last_Name,
    Email,
    PhoneNumber,
    Password,
    Gender,
    Flag_IsBusinessOwner /* Y --> Business Owner, N--> user */,
    Address /* Now collect data for businessOwner */,
    logo
  } = req.body.person;

  let { Business_Name, business_type, LocationOfBusiness } =
    req.body.Business;
  let c = Flag_IsBusinessOwner;
  Person_ID = PhoneNumber;
  console.log("1");
  var personFlag = PersonDataIsFilled(req);
  
  if (personFlag) {
    console.log("2");

    return res.status(400).json({ Message: "Must fill all information" });
  }
  console.log("3");

  if (c) {
    console.log("4");

    var businessFlag = BusinessDataIsFilled(req);
    if (businessFlag) {
      console.log("5");
      return res
        .status(400)
        .json("Must fill all information for Business Owner");
    }
  }
  const { error } = await getSupabase().from("Person").insert([
    {
      First_Name,
      Last_Name,
      Address,
      Password,
      Email,
      Gender,
      Flag_IsBusinessOwner,
      PhoneNumber,
      Person_ID,
      logo,
    },
  ]);
  if (error) {
    console.log(666)
    return res.status(500).json({ error: error.message });
  }

  if (c) {
    console.log(2222)
    console.log(Business_Name)
    console.log(LocationOfBusiness)
    console.log(Person_ID)
    console.log(business_type)
    console.log(logo)
    const { error2 } = await getSupabase().from("BusinessOwner").insert([
      {
        Business_Name,
        LocationOfBusiness,
        Person_ID,
        business_type,
        logo,
      },
    ]);
    if (error2) {
    console.log(3333)

      return res.status(500).json({ error: error.message });
    }
    console.log(4444)

  }
  console.log(5555)

  return res.status(201).json({ Message: "Created" });
};

function PersonDataIsFilled(req) {
  const {
    First_Name,
    Last_Name,
    Email,
    PhoneNumber,
    Password,
    Gender,
    Flag_IsBusinessOwner /* Y --> Business Owner, N--> user */,
    Address /* Now collect data for businessOwner */,
  } = req.body.person;
  console.log(req.body.person);
  console.log(First_Name == "");
  console.log(Last_Name == "");
  console.log(Email == "");
  console.log(PhoneNumber == "");
  console.log(Gender == "");
  console.log(Flag_IsBusinessOwner == true);
  console.log(Address == "");

  if (
    First_Name == "" ||
    Last_Name == "" ||
    Email == "" ||
    PhoneNumber == "" ||
    Password == "" ||
    Gender == "" ||
    Address == ""
  ) {
    return true;
  }
}

function BusinessDataIsFilled(req) {
  const { Business_Name, business_type, LocationOfBusiness } =
    req.body.Business;
    console.log(req.body.Business);
    console.log(Business_Name == "")
    console.log(business_type == null)
    console.log(LocationOfBusiness == "")
    console.log(business_type)
    console.log()
  if (Business_Name == "" || business_type == null || LocationOfBusiness == "") {
    return true;
  }
}

exports.updateInfo = async (req, res, next) => {
  let { Business_Name, LocationOfBusiness, logo } = req.body;
  const { data: Pers, error } = await getSupabase()
    .from("BusinessOwner")
    .select("*")
    .eq("Person_ID", req.userId);
  if (Pers.length > 0) {
    Business_Name = Business_Name != "" ? Business_Name : Pers[0].Business_Name;
    LocationOfBusiness =
      LocationOfBusiness != ""
        ? LocationOfBusiness
        : Pers[0].LocationOfBusiness;
    logo = logo != "" ? logo : Product[0].logo;
    if (Business_Name != "") {
      const { names, err } = await getSupabase()
        .from("Product")
        .update({ 'Business_Name': Business_Name })
        .eq("Business_Name", Pers[0].Business_Name);
      const { namess, errr } = await getSupabase()
        .from("Review")
        .update({ 'Business_Name': Business_Name })
        .eq("Business_Name", Pers[0].Business_Name);
    }
    if (logo != "") {
      await imageUploader
        .uploadImage(logo)
        .then(function (result) {
          logo = result.url;
          console.log(result.url);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      logo = Product[0].logo;
    }
    const { data, error } = await getSupabase()
      .from("BusinessOwner")
      .update({
        'Business_Name': Business_Name,
        'LocationOfBusiness': LocationOfBusiness,
        'logo': logo
      })
      .eq("Person_ID", req.userId);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ message: "Business owner not found" });
  }
  return res.status(200).json({ message: "Info updated successfully" });
};

exports.getAllBuisnessOwners = async (req, res, next) => {
  const type = req.params.type;
  const { data, error } = await getSupabase()
    .from("BusinessOwner")
    .select("Business_Name, business_type, logo, Sections(id, section)")
    .eq("business_type", type);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};

exports.getBuisnessOwners = async (req, res, next) => {
  const { data, error } = await getSupabase()
    .from("BusinessOwner")
    .select("Business_Name, business_type, logo, Sections(id, section)");
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};

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
