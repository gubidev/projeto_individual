const pool = require('../config/db');


module.exports = {
  async criar(medico_id, data, hora) {
    const result = await pool.query(
      'INSERT INTO horarios_disponiveis (medico_id, data, hora) VALUES ($1, $2, $3)',
      [medico_id, data, hora]
    );
    return result;
  },

  async listarTodos() {
    const result = await pool.query('SELECT * FROM horarios_disponiveis ORDER BY data, hora');
    return result.rows;
  }
};


