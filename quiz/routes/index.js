var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller')
var autorController = require('../controllers/autor_controller')
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* Listado - Alex Baquerizo Jimenez */
var userController = require('../controllers/user_controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});


<<<<<<< HEAD

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);
=======
// Autoload de comandos con :quizId
router.param('quizId',quizController.load); //autoload :quizId
router.param('comentId',commentController.load); //autoload :commentId
>>>>>>> 9a7f6282a951cbb66bf4940b005a31c494b2d610

//Rutas de sesion
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/autores', autorController.list); // Ruta del listado de autores

router.get('/users', sessionController.adminRequired, userController.index); /* Listado - Alex Baquerizo Jimenez */

router.get('/quizes', quizController.index);

router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
<<<<<<< HEAD
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);
=======
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);
>>>>>>> 9a7f6282a951cbb66bf4940b005a31c494b2d610

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

router.get('/quizes/:quizId(\\d+)/comments/:comentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

module.exports = router;
