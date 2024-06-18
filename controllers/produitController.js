const Produit = require("../model/produit");
const cors = require('cors')
const multer = require('multer')

exports.getProduit = async (req, res) => {
    try {
        const produit = await Produit.getProduits();
        res.json(produit);
      } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

exports.getProduitById = async (req, res) => {
  try {
    const { id_produit } = req.params; // Get the product ID from the request parameters
    const produit = await Produit.getProduitById(id_produit); // Assuming you have a method like getProduitById in your model
    if (!id_produit) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(produit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/Images")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({storage})

exports.createProduit = async (req, res) => {
  // Use the 'upload' middleware to handle file uploads
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload error', error: err.message });
    }

    const { libelle, description, prix, quantite } = req.body;
    
    const image = req.file.filename;

    try {
      const newProduit = await Produit.createProduit(libelle, description, prix, quantite, image);
      res.json({ message: 'Produit registered successfully', produit: newProduit });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
};

  exports.deleteProduit  = async (req, res) => {
    const id_produit = req.params.id_produit;
  
    try {
      const delProduit = await Produit.DeleteProduit( id_produit );
      res.json({ message: `Deleted product with id_produit ${id_produit}`, produit: delProduit });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }
  
  exports.UpdateProduit = async (req, res) => {
    const id_produit = req.params.id_produit;
    const { libelle,description,prix,quantite,image } = req.body;

    try {
      const UpdProduit = await Produit.UpdateProduit( id_produit, libelle, description, prix, quantite,image);
      res.json({ message: 'Produit Updated successfully', produit: UpdProduit });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }

};