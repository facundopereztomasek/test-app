//DATABASE_URL  heroku-postgresql:hobby-dev
// index.js
var config = require('./.config.json')[process.env.ENV || 'development'];
console.log(config);
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password, {
    host: config.database.url,
    port: config.database.port,
    dialect: config.database.dialect,
    dialectOptions: config.database.dialectOptions
  }
);

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync().then(function() {
}).then(function(jane) {
  'Database initialized'
});

var restify = require('restify');

var server = restify.createServer();

server.use(restify.queryParser());

server.listen(process.env.PORT || 8080, function() {
  console.log('Iniciado');
  console.log('%s listening at %s', server.name, server.url);
});

server.get('/', function(req, res, next) {
  res.send(200, 'Bienvenido!');
});

server.get('/users', function(req, res, next) {
  User.findAll().then(function (users) {
    res.send(200, users);
    return next();
  });
});

server.get('/users/:name', function(req, res, next) {
  User.findAll({
    where: {
      username: req.params.name
    }
  }).then(function (err, users) {
    if (err) {
      res.send(400, err)
      return next();
    }
    res.send(200, users);
    return next();
  });
});