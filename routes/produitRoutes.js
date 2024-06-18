const express = require('express');

const produitController = require ('../controllers/produitController');

const router = express.Router();


router.get('/getall',produitController.getProduit);
router.get('/getproduct/:id_produit',produitController.getProduitById);
router.post('/create',produitController.createProduit);
router.delete('/delete/:id_produit', produitController.deleteProduit);
router.put('/update/:id_produit',produitController.UpdateProduit);


module.exports = router;
