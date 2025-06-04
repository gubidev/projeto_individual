const db = require('../config/db');

class Medico {
  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM medicos WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM medicos WHERE id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = Medico;

