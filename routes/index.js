const express = require('express');
const router = express.Router();
const HorarioController = require('../controllers/HorarioController');

// Página inicial
router.get('/', (req, res) => {
  res.render('index');
});

// Rota para exibir formulário de horários
router.get('/horarios', HorarioController.mostrarFormulario);
router.post('/horarios', HorarioController.criar);

module.exports = router;
