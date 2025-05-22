const Horario = require('../models/Horario');

const HorariosController = {
  mostrarFormulario: (req, res) => {
    res.render('horarios');
  },

  criar: async (req, res) => {
    const { medico_id, data, hora } = req.body;

    try {
      await Horario.criar({ medico_id, data, hora });
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao salvar horário');
    }
  },
};

module.exports = HorariosController;
