const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const HorarioController = require('../controllers/HorarioController');
const PacienteController = require('../controllers/PacienteController');
const Medico = require('../models/medico');
const { getDiasDoMesComCores } = require('../utils/calendarUtils');

// Rota principal
router.get('/', (req, res) => {
  res.render('login_unificado', {
    error: null,
    tipo: req.query.tipo || 'paciente',
    registroSucesso: req.query.registro === 'sucesso'
  });
});

// Rotas de Autenticação
router.post('/login', authController.login);
router.post('/paciente/registro', authController.registrarPaciente);
router.get('/logout', authController.logout);

// Rotas do Médico
router.get('/dashboard', async (req, res) => {
  if (!req.session.medicoId) return res.redirect('/?tipo=medico');

  try {
    let mes = parseInt(req.query.mes) || new Date().getMonth();
    let ano = parseInt(req.query.ano) || new Date().getFullYear();

    if (mes > 11) { mes = 0; ano++; }
    if (mes < 0) { mes = 11; ano--; }

    const medico = await Medico.findById(req.session.medicoId);
    const dias = await getDiasDoMesComCores(req.session.medicoId, mes, ano);

    res.render('dashboard', {
      nomeMedico: medico.nome,
      idMedico: medico.id,
      dias,
      mes,
      ano,
      anoAtual: new Date().getFullYear()
    });
  } catch (err) {
    console.error(err);
    res.redirect('/logout');
  }
});

// Rotas do Paciente
router.get('/paciente/dashboard', PacienteController.mostrarDashboard);
router.post('/reservar-horario', 
  express.json(),
  PacienteController.reservarHorario
);

// Rotas de Horários
router.get('/horarios', HorarioController.mostrarFormulario);
router.post('/horarios', HorarioController.criar);
router.post('/horarios-dashboard', HorarioController.criarViaDashboard);
router.get('/horarios-por-data', HorarioController.listarPorData);

// Rotas Legacy (compatibilidade)
router.get('/login', (req, res) => res.redirect('/?tipo=medico'));
router.get('/paciente/login', (req, res) => res.redirect('/?tipo=paciente'));

module.exports = router;