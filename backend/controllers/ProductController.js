const { getSupabase } = require("../DataBase/DBConnection");
const imageUploader = require('../Cloudinary/upload-image');


const uuid = require('uuid');

exports.AddProduct = async (req, res, next) => {
    console.log(req.body);
    let { Business_Name, Product_Name, Price, Description, Primary_Image } = req.body;
    const images = req.body.images;
    console.log(images);
    console.log(images[0]);
    console.log(images[0].url);
    const Product_ID = GenerateDynamicInteger();

    if (ProductDataIsFilled(Product_Name, Price, Description)) {
        return res.status(400).json({ Message: "Must fill all information for Product" });
    }

    if (images.length > 0) {
        const { data, error } = await getSupabase()
            .from('Product')
            .insert([{ Product_ID, Product_Name, Price, Business_Name, Description, Primary_Image }])
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        for (var i = 0; i < images.length; i++) {
            uniqueId = uuid.v4();
            let Image_ID = GenerateDynamicInteger();
            let Image_URL = images[i].url
            const { error2 } = await getSupabase()
                .from('Image_Of_Product')
                .insert([{
                    Product_ID, Image_URL, Image_ID
                }])
            if (error2) {
                return res.status(500).json({ error: error.message })
            }
        }
    }
    else {
        return res.status(400).json({ Message: "Must enter at least one image for your Product" })
    }
    return res.status(201).json({ Message: "Product added Successfully" });
}

exports.deleteProduct = async (req, res, next) => {
    Product_ID = req.params.id;
    let { data: imgs, error2 } = await getSupabase()
        .from('Image_Of_Product')
        .delete()
        .match({ Product_ID })
    if (error2) {
        return res.status(500).json({ error: error.message })
    }
    const { data, error } = await getSupabase()
        .from('Product')
        .delete()
        .match({ Product_ID })
    if (error) {
        return res.status(500).json({ error: error.message })
    }
    return res.status(200).json({ Message: "delete Product Successfully" });
}

exports.updateProduct = async (req, res, next) => {
    const Product_ID = req.params.id;
    let { Product_Name, Price, Description, Primary_Image, delete_Imgs } = req.body;
    console.log("req.body")
    console.log(req.body)
    let { data: Product, error } = await getSupabase()
        .from('Product')
        .select("*")
        .match({ Product_ID })

    if (Product.length > 0) {
        Product_Name = (Product_Name != '') ? Product_Name : Product[0].Product_Name
        Description = (Description != '') ? Description : Product[0].Description
        Price = (Price != '') ? Price : Product[0].Price
        Primary_Image = (Primary_Image != '') ? Primary_Image : Product[0].Primary_Image

        if (Primary_Image != "") {
            console.log("ok **********************")
            // await imageUploader.uploadImage(Primary_Image).then(function (result) {
            //     Primary_Image = result.url;
            //     console.log(result.url);
            // }).catch(function (error) {
            //     console.error(error);
            // });
        } else {
            Primary_Image = Product[0].Primary_Image;
        }
        const { data, error } = await getSupabase()
            .from('Product')
            .update({ 'Product_Name': Product_Name, 'Description': Description, 'Price': Price, 'Primary_Image': Primary_Image })
            .match({ Product_ID })
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        for (var j = 0; j < delete_Imgs.length; j++) {
            let { data: imgs, error } = await getSupabase()
                .from('Image_Of_Product')
                .delete()
                .match({ Image_ID: delete_Imgs[j] });
            if (error) {
                return res.status(500).json({ error: error.message })
            }
        }
        const images = req.body.images;
        console.log("Hiiiiii2222")
        console.log("images.length")
        console.log(req.body.images)
        console.log(req.body.images.length)
        console.log(images)

        if (images.length > 0) { // Frontend Must send me all url for all imgs (new and old imgs)
            console.log(images.length)
            console.log("Hiiiiii")
            // for (var i = 0; i < images.length; i++) {
                console.log(images)
                //let Image_URL = images[i].url
                let Image_ID = GenerateDynamicInteger()
                let Image_URL = images;
                // await imageUploader.uploadImage(images[i].url).then(function (result) {
                //     Image_URL = result.url;
                //     console.log(result.url);
                // }).catch(function (error) {
                //     console.error(error);
                // });

                const { error2 } = await getSupabase()
                    .from('Image_Of_Product')
                    .insert([{
                        Product_ID, Image_URL, Image_ID
                    }])
                if (error2) {
                    return res.status(500).json({ error: error.message })
                }
            // }
        }
    }
    else {
        return res.status(400).json({ Message: "Not Found this Product" })
    }
    return res.status(200).json({ Message: "Product Updated Successfully" })
}

exports.getAllProducts = async (req, res, next) => {
    let { data: Products, error } = await getSupabase()
        .from('Product')
        .select("*")
    if (error) {
        // Return an error if there was a problem retrieving the products
        res.status(500).send({ Message: error });
    } else {

        // Return the list of products in JSON format
        res.status(200).json(Products);
    }
}

exports.getProductByID = async (req, res, next) => {
    const Product_ID = req.params.id;
    let { data: Images, error } = await getSupabase()
        .from('Image_Of_Product')
        .select("Image_URL,Image_ID")
        .eq('Product_ID', Product_ID)


    if (error) {
        // Return an error if there was a problem retrieving the product
        res.status(500).send(error);
    } else if (!Images) {
        // Return a 404 error if the product with the specified ID was not found
        res.status(404).send(`Product with ID ${Product_ID} not found`);
    } else {

        let { data: Product } = await getSupabase()
            .from('Product')
            .select("*")
            .eq('Product_ID', Product_ID)

        let { data: Review } = await getSupabase()
            .from('Review')
            .select('Rating')
            .eq('Product_ID', Product_ID)

        let averageRating = null;
        if (Review.length == 0) {
            averageRating = "there is no reviews for this product";
        } else {
            let sum = 0;
            for (let i = 0; i < Review.length; i++) {
                //console.log(Review[i].Rating);
                sum += Review[i].Rating;
            }
            sum = sum / Review.length;
            averageRating = sum.toFixed(2);
        };
        const result = {
            info: Product,
            ratingAVG: averageRating,
            imagesURL: Images
        }
        // Return the product in JSON format
        res.status(200).json(result);
    }
}
exports.getReviewsByID = async (req, res, next) => {
    const Product_ID = req.params.id;
    let { data: Review, error } = await getSupabase()
        .from('Review')
        .select("*")
        .eq('Product_ID', Product_ID)

    if (error) {
        // Return an error if there was a problem retrieving the product
        res.status(500).send(error);
    } else if (!Review) {
        // Return a 404 error if the product with the specified ID was not found
        res.status(404).send(`Product with ID ${Product_ID} not found`);
    } else {
        // Return the product in JSON format
        res.status(200).json(Review);
    }
}
exports.getFiltersProducts = async (req, res, next) => {
    try {
        let { Product_Name, Max_Price, Min_Price, LocationOfBusiness, business_type } = req.body;

        let queryProduct = getSupabase()
            .from('Product')
            .select('*');

        if (Product_Name) {
            queryProduct = queryProduct.ilike('Product_Name', `%${Product_Name}%`);
        }

        const { data: data, error } = await queryProduct;

        Min_Price = (Min_Price == '') ? 0 : Min_Price;
        Max_Price = (Max_Price == '') ? Number.MAX_SAFE_INTEGER : Max_Price;
        const cheapProducts = data.filter(product => product.Price >= Min_Price & product.Price <= Max_Price);
        // i use filter instead of map to ignore null values

        if (error) {
            res.status(500).json({ error: error.message });
        }

        let queryBusinessOwner = getSupabase()
            .from('BusinessOwner')
            .select('*');


        if (business_type) {
            queryBusinessOwner = queryBusinessOwner.match({ business_type: business_type });
        }

        if (LocationOfBusiness) {
            queryBusinessOwner = queryBusinessOwner.match({ LocationOfBusiness: LocationOfBusiness });
        }

        let { data: businessOwners, errorBO } = await queryBusinessOwner;

        if (errorBO) {
            res.status(500).json({ error: error.message });
        }

        productsWithImages = [{ data: cheapProducts }]


        //!!!!!!!!!!!!!!!!!!
        let queryFavorites = await getSupabase()
            .from('Favorites')
            .select('*')
            .eq("Person_ID", req.userId);

        if (error) {
            res.status(500).json({ error: error.message })
        }

        const keyMapFavorites = new Map();

        // loop through each item in the data array
        for (let i = 0; i < queryFavorites.data.length; i++) {
            const item = queryFavorites.data[i];
            const Product_id = item.Product_ID;
            const Person_iD = item.Person_ID;
            keyMapFavorites.set(Product_id, Person_iD);
        }
        //!!!!!!!!!!!!!!!!!!

        const businessesMap = new Map();
        // linking products to their respective business owners
        linkingProductsWithCorrespondBusinessOwner(productsWithImages, businessesMap, keyMapFavorites);

        // Convert the map of businesses to List
        const FilterProduct = [];
        convertBusinessMapToList(businessesMap, FilterProduct);

        let querySections = await getSupabase()
            .from('Sections')
            .select('*')
        if (error) {
            res.status(500).json({ error: error.message })
        }

        const keyMap = new Map();

        // loop through each item in the data array
        for (let i = 0; i < querySections.data.length; i++) {
            const item = querySections.data[i];
            const id = item.id;
            const section = item.section;

            keyMap.set(id, section);
        }
        const commonProducts = FilterProduct.reduce((acc, cur) => {
            const { name, products } = cur;
            const matchingProducts = businessOwners.filter(product => product.Business_Name === name);
            if (matchingProducts.length) {
                var sectionn = keyMap.get(matchingProducts[0].business_type); /// 
                var LocationOfBusiness = matchingProducts[0].LocationOfBusiness;
                acc.push({ BusinessName: name, LocationOfBusiness, sectionn, products });
            }
            return acc;
        }, []);
        res.status(200).json({ FilterProducts: commonProducts });

    } catch (error) {
        res.status(400).json({ Message: "Bad Request" });
    }
}

function linkingProductsWithCorrespondBusinessOwner(productsWithImages, businessesMap, mapFavorite) {
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
                Favoriite: mapFavorite.has(product.data[i].Product_ID)
            });
        }
    }
}

function convertBusinessMapToList(businessesMap, FilterProduct) {
    for (const [businessName, products] of businessesMap) {
        FilterProduct.push({
            name: businessName,
            products: products
        });
    }
}

function ProductDataIsFilled(Product_Name, Price, Description) {
    if (Product_Name == '' || Price == '' || Description == '') {
        return true;
    }
}

function GenerateDynamicInteger() {
    // Generate a UUID
    let uniqueId = uuid.v4();

    // Convert the UUID to an int8 using Buffer
    return (Buffer.from(uniqueId.replace(/-/g, ''), 'hex')[0]);
}
