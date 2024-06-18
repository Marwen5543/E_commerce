const db = require('../db/queries.js');


class Commande {

    static async getCommande(id_user) {
        const query = 'SELECT id_cmd, date_cmd, totale, id_produit, id_user, qte FROM public."Commande" WHERE id_user = $1';
        const values = [id_user]; // An array of parameter values
        const result = await db.query(query, values);
        return result.rows;
      }
      

      static async getAllCommandes() {
        const query = 'SELECT id_cmd, date_cmd, totale, id_produit, id_user, qte FROM public."Commande"';
        const result = await db.query(query);
        return result.rows;
      }
           
      

    static async createCommande(totale,id_produit,id_user, qte ){

        const query = 'INSERT INTO public."Commande"(date_cmd, totale, id_produit, id_user, qte ) VALUES (CURRENT_DATE, $1, $2, $3, $4)';
        const values = [        
           
            totale,
            id_produit,
            id_user,
            qte ]    
            const result = await db.query(query,values);
        return result.rows[0];
            }


}
module.exports = Commande;
