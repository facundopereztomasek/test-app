//DATABASE_URL  heroku-postgresql:hobby-dev
// index.js
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
  process.env.DB_NAME || 'da1r1gs5po0rs7',
  process.env.DB_USERNAME || 'csvgsbjixximdp',
  process.env.DB_PASSWORD || 'HUL9pI2oE2C6i5nR3QUko07CTZ', {
    host: process.env.DB_URL || 'ec2-54-225-195-254.compute-1.amazonaws.com',
    port: process.env.DB_PORT || '5432',

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