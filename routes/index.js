const express = require('express');
const router = express.Router();
const HorarioController = require('../controllers/HorarioController');

// Página inicial
router.get('/', (req, res) => {
  res.render('index');
});

// Exibe o formulário para criar um novo horário
router.get('/horarios', HorarioController.mostrarFormulario);

// Processa o envio do formulário e cria o horário
router.post('/horarios', HorarioController.criar);

// (Opcional) Exibe todos os horários já cadastrados
// router.get('/horarios/lista', HorarioController.listar); // se quiser essa rota depois

module.exports = router;
