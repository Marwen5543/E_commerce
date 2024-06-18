const Commande = require("../model/Commande");


exports.getCommande = async (req, res) => {
    try {
        const id_user = req.params.id_user;
      const commande = await Commande.getCommande(id_user);
      res.json(commande);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.getAllCommandes = async (req, res) => {
    try {
      const commandes = await Commande.getAllCommandes();
      res.json(commandes);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  

exports.createCommande = async (req, res) => {
    const { id_produit,id_user, qte , prix } = req.body;
  
    try {
      const newCommande = await Commande.createCommande( prix*qte,id_produit,id_user, qte , prix);

      res.json({ message: 'commande registered successfully', Commande: newCommande });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }