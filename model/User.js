const db = require('../db/queries.js');

class User {
  static async createUser(username, password) {
    const query = 'INSERT INTO public."Utilisateur" (username, h_password) VALUES ($1, $2) RETURNING *';
    const values = [username, password];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async getUserByUsername(username) {
    const query = 'SELECT * FROM public."Utilisateur" WHERE username = $1';
    const values = [username];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async getUserById(id) {
    const query = 'SELECT * FROM public."Utilisateur" WHERE id = $1';
    const values = [id];

    const result = await db.query(query, values);
    return result.rows[0];
  }
}

module.exports = User;
