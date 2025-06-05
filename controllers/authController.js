const bcrypt = require('bcrypt');
const Medico = require('../models/medico');
const pool = require('../config/db');

const authController = {
  login: async function(req, res) {
    try {
      const { email, senha, tipo } = req.body;
      
      if (tipo === 'medico') {
        const medico = await Medico.findByEmail(email);
        if (!medico || medico.senha !== senha) {
          return res.render('login_unificado', {
            error: 'Credenciais inválidas',
            tipo: 'medico'
          });
        }
        req.session.medicoId = medico.id;
        return res.redirect('/dashboard');
      } else {
        const result = await pool.query('SELECT * FROM pacientes WHERE email = $1', [email]);
        if (result.rows.length === 0) {
          return res.render('login_unificado', {
            error: 'Paciente não encontrado',
            tipo: 'paciente'
          });
        }
        const paciente = result.rows[0];
        const senhaValida = await bcrypt.compare(senha, paciente.senha);
        if (!senhaValida) {
          return res.render('login_unificado', {
            error: 'Senha incorreta',
            tipo: 'paciente'
          });
        }
        req.session.pacienteId = paciente.id;
        return res.redirect('/paciente/dashboard');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return res.render('login_unificado', {
        error: 'Erro no servidor',
        tipo: req.body.tipo || 'paciente'
      });
    }
  },

  registrarPaciente: async function(req, res) {
    try {
      const { nome, email, senha, cpf, telefone, data_nascimento } = req.body;
      const senhaHash = await bcrypt.hash(senha, 10);
      
      await pool.query(
        `INSERT INTO pacientes (nome, email, senha, cpf, telefone, data_nascimento)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [nome, email, senhaHash, cpf, telefone, data_nascimento]
      );
      
      return res.redirect('/?tipo=paciente&registro=sucesso');
    } catch (error) {
      console.error('Erro no registro:', error);
      return res.render('paciente_registro', {
        error: 'Erro ao registrar. Tente novamente.'
      });
    }
  },

  logout: function(req, res) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }
};

module.exports = authController;