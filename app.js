const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');

const app = express();

// Configurações para parsear corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessão
app.use(session({
  secret: 'segredo-supersecreto',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true apenas em HTTPS
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', routes);

// Middleware para tratar erros (ex: 500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno no servidor.');
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});