const Horario = require('../models/Horario');
const pool = require('../config/db'); // Para buscar os médicos

const HorariosController = {
  // Mostra o formulário com a lista de médicos
  mostrarFormulario: async (req, res) => {
    try {
      const resultado = await pool.query('SELECT id, nome FROM medicos ORDER BY nome');
      const medicos = resultado.rows;
      res.render('horarios', { medicos }); // passa os médicos para a view
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao carregar o formulário');
    }
  },

  // Salva o horário criado
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
};

module.exports = HorariosController;
