const express = require('express');

const commandeController = require ('../controllers/commandeController');


const router = express.Router();


router.get('/getcmd/:id_user',commandeController.getCommande);
router.get('/getall',commandeController.getAllCommandes);

router.post('/create',commandeController.createCommande);


module.exports = router;
