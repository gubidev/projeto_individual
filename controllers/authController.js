const bcrypt = require('bcrypt');
const Medico = require('../models/medico');
const pool = require('../config/db'); // para consultas diretas ao PostgreSQL

// LOGIN MÉDICO
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const medico = await Medico.findByEmail(email);
    if (!medico || medico.senha !== senha) {
      return res.render('login', { error: 'Email ou senha inválidos.' });
    }

    req.session.medicoId = medico.id;
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Erro ao realizar login.' });
  }
};

// REGISTRO PACIENTE
exports.registrarPaciente = async (req, res) => {
  const { nome, email, senha, cpf, telefone, data_nascimento } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await pool.query(
      'INSERT INTO pacientes (nome, email, senha, cpf, telefone, data_nascimento) VALUES ($1, $2, $3, $4, $5, $6)',
      [nome, email, senhaCriptografada, cpf, telefone, data_nascimento]
    );

    res.redirect('/paciente/login');
  } catch (err) {
    console.error(err);
    res.render('paciente_registro', { error: 'Erro ao registrar. Verifique os dados.' });
  }
};

// LOGIN PACIENTE
exports.loginPaciente = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query('SELECT * FROM pacientes WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.render('paciente_login', { error: 'E-mail não encontrado.' });
    }

    const paciente = result.rows[0];
    const senhaConfere = await bcrypt.compare(senha, paciente.senha);

    if (!senhaConfere) {
      return res.render('paciente_login', { error: 'Senha incorreta.' });
    }

    req.session.pacienteId = paciente.id;
    req.session.nomePaciente = paciente.nome;
    res.redirect('/paciente/dashboard');
  } catch (err) {
    console.error(err);
    res.render('paciente_login', { error: 'Erro ao fazer login.' });
  }
};
