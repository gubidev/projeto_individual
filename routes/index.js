const express = require('express');
const router = express.Router();

const Medico = require('../models/medico');
const HorarioController = require('../controllers/HorarioController');
const PacienteController = require('../controllers/PacienteController');
const authController = require('../controllers/authController');
const { getDiasDoMesComCores } = require('../utils/calendarUtils');

// Redirecionar a raiz para o login do paciente
router.get('/', (req, res) => {
  res.redirect('/paciente/login');
});

// Página inicial antiga (opcional)
router.get('/pi', (req, res) => {
  res.render('index');
});

// Página de login de médico
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Login do médico (POST)
router.post('/login', authController.login);

// Dashboard do médico com calendário
router.get('/dashboard', async (req, res) => {
  const medicoId = req.session.medicoId;
  if (!medicoId) return res.redirect('/login');

  const mes = parseInt(req.query.mes) || new Date().getMonth(); // 0 a 11
  const ano = parseInt(req.query.ano) || new Date().getFullYear();

  try {
    const medico = await Medico.findById(medicoId);
    const dias = await getDiasDoMesComCores(medicoId, mes, ano);

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
    res.redirect('/');
  }
});

// Página de dashboard do paciente
router.get('/paciente/dashboard', (req, res) => {
  if (!req.session.pacienteId) return res.redirect('/paciente/login');
  res.send(`Bem-vindo, ${req.session.nomePaciente}!`);
});

// Login de paciente
router.get('/paciente/login', (req, res) => {
  res.render('paciente_login', { error: null });
});

router.post('/paciente/login', authController.loginPaciente);

// Registro de paciente
router.get('/paciente/registro', (req, res) => {
  res.render('paciente_registro', { error: null });
});

router.post('/paciente/registro', authController.registrarPaciente);

// Formulário antigo de horário
router.get('/horarios', HorarioController.mostrarFormulario);
router.post('/horarios', HorarioController.criar);

// Novo: salvar horário via dashboard
router.post('/horarios-dashboard', HorarioController.criarViaDashboard);

// Buscar pacientes por data
router.get('/pacientes/:data', PacienteController.buscarPorData);

// Salvar anotação
router.post('/anotacoes', PacienteController.salvarAnotacao);

// Listar horários por data
router.get('/horarios-por-data', HorarioController.listarPorData);

module.exports = router;