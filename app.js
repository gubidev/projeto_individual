const express = require('express');
const path = require('path');
const routes = require('./routes');
const session = require('express-session');
const app = express();

// 1. Configuração da sessão (DEVE VIR PRIMEIRO)
app.use(session({
  secret: 'segredo-supersecreto',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Opcional para desenvolvimento
}));

// 2. Middleware para debug (opcional)
app.use((req, res, next) => {
  console.log('Sessão atual:', req.session); // 👈 Verifique se medicoId está sendo setado
  next();
});

// 3. Parser de formulários
app.use(express.urlencoded({ extended: true }));

// 4. Middleware de redirecionamento (AGORA pode acessar req.session)
app.use((req, res, next) => {
  if (req.session.medicoId && req.path === '/') {
    return res.redirect('/dashboard');
  }
  if (req.session.pacienteId && req.path === '/') {
    return res.redirect('/paciente/dashboard');
  }
  next();
});

// 5. Configuração da view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 6. Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// 7. Rotas
app.use('/', routes);

// 8. Error handling (novo)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo quebrou!');
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});