const pool = require('../config/db');

class Horario {
  static async criar(medico_id, data, hora) {
    const result = await pool.query(
      `INSERT INTO horarios_disponiveis (medico_id, data, hora) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [medico_id, data, hora]
    );
    return result.rows[0];
  }

  static async listarDisponiveisPorMes(medicoId, mes, ano) {
    const result = await pool.query(
      `SELECT h.id, h.data, h.hora
       FROM horarios_disponiveis h
       LEFT JOIN reservas r ON h.id = r.horario_id
       WHERE h.medico_id = $1
       AND EXTRACT(MONTH FROM h.data) = $2
       AND EXTRACT(YEAR FROM h.data) = $3
       AND r.id IS NULL
       ORDER BY h.data, h.hora`,
      [medicoId, mes, ano]
    );
    return result.rows;
  }

  static async reservarHorario(horarioId, pacienteId) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const reservaExistente = await client.query(
        'SELECT 1 FROM reservas WHERE horario_id = $1',
        [horarioId]
      );
      
      if (reservaExistente.rows.length > 0) {
        throw new Error('Horário já reservado');
      }
      
      await client.query(
        `INSERT INTO reservas (paciente_id, horario_id)
         VALUES ($1, $2)`,
        [pacienteId, horarioId]
      );
      
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async listarPorData(medicoId, data) {
    const result = await pool.query(
      `SELECT h.id, h.hora
       FROM horarios_disponiveis h
       LEFT JOIN reservas r ON h.id = r.horario_id
       WHERE h.medico_id = $1
       AND h.data = $2
       AND r.id IS NULL
       ORDER BY h.hora`,
      [medicoId, data]
    );
    return result.rows;
  }
}

module.exports = Horario;