const express = require('express');
const path = require('path');
const routes = require('./routes');
const app = express(); // <- TEM QUE VIR ANTES de usar `app`

// Middleware para interpretar dados de formulários
app.use(express.urlencoded({ extended: true }));

// Define onde ficam as views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define a pasta pública com CSS e outros arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usa o arquivo de rotas
app.use('/', routes);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
