// controllers/HorarioController.js
const Horario = require('../models/Horario');
const pool = require('../config/db');

const HorariosController = {
  mostrarFormulario: async (req, res) => {
    try {
      const resultado = await pool.query('SELECT id, nome FROM medicos ORDER BY nome');
      const medicos = resultado.rows;
      res.render('horarios', { medicos });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao carregar o formulário');
    }
  },

  criar: async (req, res) => {
    const { medico_id, data, hora } = req.body;
    try {
      await Horario.criar(medico_id, data, hora);
      res.redirect('/horarios');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao salvar horário');
    }
  },

  criarViaDashboard: async (req, res) => {
    const { id_medico, data, horario } = req.body;
    try {
      await Horario.criar(id_medico, data, horario);
      res.redirect(`/dashboard?id_medico=${id_medico}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao salvar horário');
    }
  },

  listarPorData: async (req, res) => {
    const { data, id_medico } = req.query;

    try {
      const result = await pool.query(`
        SELECT 
          h.id,
          h.hora,
          r.id AS reserva_id,
          p.nome AS paciente_nome
        FROM horarios_disponiveis h
        LEFT JOIN reservas r ON r.horario_id = h.id
        LEFT JOIN pacientes p ON p.id = r.paciente_id
        WHERE h.data = $1 AND h.medico_id = $2
        ORDER BY h.hora
      `, [data, id_medico]);

      res.json({ horarios: result.rows });
    } catch (err) {
      console.error('Erro ao buscar horários:', err);
      res.status(500).json({ error: 'Erro ao buscar horários' });
    }
  }
};

module.exports = HorariosController;
