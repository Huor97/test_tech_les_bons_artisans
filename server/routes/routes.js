const express = require("express");
const router = express.Router();

//on appelle les routes depuis controller:
const productControl = require("../controller/phones");

//on connecte les routes:

// Routes administrateur : créer, supprimer, modifier les produits
router.post("/phones", productControl.createProduct);
router.delete("/phones/:id", productControl.deleteProduct);
router.patch("/phones/:id", productControl.patchProduct);

// Routes générales pour le fonctionnement du site : voir tous les produits/utilisateurs,
//  obtenir les infos d'un produit/d'un utilisateur
router.get("/phones", productControl.getProducts);
router.get("/phones/:id", productControl.getProduct);

module.exports = router;
