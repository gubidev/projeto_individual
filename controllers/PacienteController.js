const pool = require('../config/db');

exports.buscarPorData = async (req, res) => {
  const { data } = req.params;
  const { id_medico } = req.query;

  try {
    const result = await pool.query(
      'SELECT id, nome FROM pacientes WHERE data = $1 AND id_medico = $2',
      [data, id_medico]
    );
    res.json({ pacientes: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ pacientes: [] });
  }
};

exports.salvarAnotacao = async (req, res) => {
  const { id_paciente, anotacao } = req.body;

  try {
    await pool.query(
      'UPDATE pacientes SET anotacao = $1 WHERE id = $2',
      [anotacao, id_paciente]
    );
    res.redirect('back');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao salvar anotação.');
  }
};