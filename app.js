const express = require('express');
const path = require('path');
const routes = require('./routes');
const session = require('express-session');
const app = express(); // 👍 Correto

// Middleware para interpretar dados de formulários
app.use(express.urlencoded({ extended: true })); // 👍 Obrigatório para req.body

// Middleware de sessão (👍 ESSENCIAL para funcionar o login com req.session)
app.use(session({
  secret: 'segredo-supersecreto',
  resave: false,
  saveUninitialized: false
}));

// View engine configurada com EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // 👍 Certo

// Arquivos estáticos (CSS, JS, imagens...)
app.use(express.static(path.join(__dirname, 'public')));

// Usa as rotas
app.use('/', routes);

// Inicia servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
