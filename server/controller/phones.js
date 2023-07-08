const Product = require("../models/Phones");

//on détermine la route "créer un produit" (en asynchrone) et on export la fonction dans routes.js:
exports.createProduct = async (req, res) => {
  try {
    //destructuring:
    const { name, type, price, rating, warranty_years, available } = req.body;

    // création catégorie :

    //nouveau produit:
    const newProduct = new Product({
      name: name,
      type: type,
      price: price,
      rating: rating,
      warranty_years: warranty_years,
      available: available,
    });

    //enregistrement de la nouvelle phone dans la BDD:
    await newProduct.save();
    res.status(201);
    res.json("Product created !");
    res.end();
  } catch (error) {
    //si ça ne fonctionne pas, afficher l'erreur:
    res.status(400);
    res.json("Could not create product : ", error);
    res.end();
  }
};

//SUPPRIMER une phone de la BDD
exports.deleteProduct = async (req, res) => {
  try {
    //si l'id de la phone a bien été transmis:
    if (req.params.id) {
      //on cherche la phone à partir de son id dans la BDD et on la supprime:
      await Product.findByIdAndDelete(req.params.id);
      res.status(201).json("Product deleted !");
      //sinon, si aucun id n'a été transmis:
    } else {
      res.status(400);
      res.json("Missing id");
      res.end();
    }
  } catch (error) {
    res.status(400);
    res.json("Could not delete product : ", error);
    res.end();
  }
};

//MODIFIER une phone dans le BDD
exports.patchProduct = async (req, res) => {
  try {
    //on récupère les modifications dans le body
    const updateRequest = {
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      rating: req.body.rating,
      warranty_years: req.body.warranty_years,
      available: req.body.available,
    };
    //on cherche la phone à partir de son id dans la BDD:
    const productToUpdate = await Product.findOne({ _id: req.params.id });
    //on remplace les données initiales par les nouvelles si elles sont dans l'objet updateRequest
    //sinon, on garde les données ititiales (productToUpdate)
    productToUpdate.name = updateRequest.name ?? productToUpdate.name;
    productToUpdate.type = updateRequest.type ?? productToUpdate.type;
    productToUpdate.price = updateRequest.price ?? productToUpdate.price;
    productToUpdate.rating = updateRequest.rating ?? productToUpdate.rating;
    productToUpdate.warranty_years =
      updateRequest.warranty_years ?? productToUpdate.warranty_years;
    productToUpdate.available =
      updateRequest.available ?? productToUpdate.available;
    //on remplace l'objet initial dans la BDD par le nouvel objet modifié productToUpdate:
    await Product.updateOne({ _id: req.params.id }, { $set: productToUpdate });
    res.status(201);
    res.json("Product updated !");
    res.json(productToUpdate);
    res.end();
  } catch (error) {
    res.status(400);
    res.json("Could not patch product : ", error);
    res.end();
  }
};

//On détermine la route "lire tous les produits" (en asynchrone) et on export la fonction dans routes.js:
exports.getProducts = async (req, res) => {
  try {
    let products = await Product.find().lean();
    res.status(200);
    res.json(products);
    res.end();
  } catch (error) {
    res.status(400);
    res.json("Failed to load the products : ", error);
    res.end();
  }
};

//On détermine la route "lire UN produit" (en asynchrone) et on export la fonction dans routes.js:
exports.getProduct = async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id }).lean();
    res.status(200);
    res.json(product);
    res.end();
  } catch (error) {
    res.status(400);
    res.json("Failed to load the product : ", error);
    res.end();
  }
};
