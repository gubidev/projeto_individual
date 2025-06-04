const db = require('../config/db');

async function getDiasDoMesComCores(medicoId, mes, ano) {
  const dias = [];
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const dataStr = `${ano}-${(mes + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

    const horarios = await db.query(
      'SELECT * FROM horarios_disponiveis WHERE medico_id = $1 AND data::date = $2',
      [medicoId, dataStr]
    );

    let cor = 'red';
    if (horarios.rows.length > 0) {
      const algumComPaciente = horarios.rows.some(h => h.paciente_id != null);
      cor = algumComPaciente ? 'green' : 'blue';
    }

    dias.push({ dia, cor });
  }

  return dias;
}

module.exports = { getDiasDoMesComCores };
