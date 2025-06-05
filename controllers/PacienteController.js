const Horario = require('../models/Horario');
const pool = require('../config/db');

const PacienteController = {
  mostrarDashboard: async (req, res) => {
    if (!req.session.pacienteId) {
      return res.redirect('/?tipo=paciente');
    }

    try {
      const { mes, ano, medico_id } = req.query;
      const mesAtual = mes ? parseInt(mes) : new Date().getMonth();
      const anoAtual = ano ? parseInt(ano) : new Date().getFullYear();
      
      const medicos = await pool.query(
        'SELECT id, nome FROM medicos ORDER BY nome'
      );
      
      let horarios = [];
      if (medico_id) {
        horarios = await Horario.listarDisponiveisPorMes(
          medico_id, 
          mesAtual + 1, 
          anoAtual
        );
      }

      res.render('paciente_dashboard', {
        nomePaciente: req.session.nomePaciente,
        horarios,
        medicos: medicos.rows,
        mes: mesAtual,
        ano: anoAtual,
        anoAtual: new Date().getFullYear(),
        primeiroDia: new Date(anoAtual, mesAtual, 1).getDay(),
        diasNoMes: new Date(anoAtual, mesAtual + 1, 0).getDate(),
        medicoSelecionado: medico_id || ''
      });
    } catch (error) {
      console.error('Erro no dashboard do paciente:', error);
      res.status(500).render('error', {
        message: 'Erro ao carregar o dashboard'
      });
    }
  },

  reservarHorario: async (req, res) => {
    if (!req.session.pacienteId) {
      return res.status(401).json({ 
        success: false, 
        error: 'Não autorizado' 
      });
    }

    // Verificação robusta do corpo da requisição
    if (!req.body || typeof req.body.horarioId === 'undefined') {
      return res.status(400).json({
        success: false,
        error: 'Dados de reserva inválidos. Horário não especificado.'
      });
    }

    const horarioId = parseInt(req.body.horarioId);
    if (isNaN(horarioId)) {
      return res.status(400).json({
        success: false,
        error: 'ID do horário inválido'
      });
    }

    try {
      await Horario.reservarHorario(horarioId, req.session.pacienteId);
      
      res.json({ 
        success: true,
        message: 'Horário reservado com sucesso!' 
      });
    } catch (error) {
      console.error('Erro ao reservar horário:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Erro ao reservar horário'
      });
    }
  }
};

module.exports = PacienteController;