var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller')
var autorController = require('../controllers/autor_controller')
var estadisticasController = require('../controllers/estadisticas_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/autores', autorController.list); // Ruta del listado de autores
router.get('/estadisticas', estadisticasController.estadisticas);
//definicion rutas /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;