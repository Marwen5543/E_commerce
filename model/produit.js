
const db = require('../db/queries.js');



class Produit   {

static async getProduitByname(libelle,description,prix,quantite, image){
    const query = 'SELECT id_produit, libelle, description, prix, quantite, image FROM public."Produit"';    
    const values = [libelle,description,prix,quantite,image] 
    
    const result = await db.query(query,values);
    return result.rows[0];
}

static async getProduits(){
const query = 'SELECT id_produit, libelle, description, prix, quantite, image FROM public."Produit" LIMIT 100 OFFSET 0';
    const result = await db.query(query);
    return result.rows;
}


static async getProduitById(id_produit){
    const query = 'SELECT id_produit, libelle, description, prix, quantite, image FROM public."Produit" WHERE id_produit = $1';
    const result = await db.query(query, [id_produit]);
    return result.rows[0]; // Assuming you expect only one product for a given id, so we return the first row.
}


static async createProduit(libelle,description,prix,quantite, image){

    const query = 'INSERT INTO public."Produit"(libelle, description, prix, quantite, image) VALUES ( $1, $2, $3, $4, $5);'   
    const values = [        
        libelle,        
        description,
        prix,
        quantite,
    image    ]    
        const result = await db.query(query,values);
    return result.rows[0];
        }

        static async UpdateProduit(id_produit, libelle, description, prix, quantite, image) {
            const query = 'UPDATE public."Produit" SET libelle=$1, description=$2, prix=$3, quantite=$4 , image=$5 WHERE id_produit=$6';
            const values = [        
                libelle,        
                description,
                prix,
                quantite,
                image,
                id_produit
            ];
        
            const result = await db.query(query, values);
            return result.rows[0];    
        }
        


        static async DeleteProduit(id_produit) {
            const query = 'DELETE FROM public."Produit" WHERE id_produit = $1';
            const values = [id_produit];
        
            const result = await db.query(query, values);
            return result.rows[0];
        }
        
}

module.exports = Produit;
