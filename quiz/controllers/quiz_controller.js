var models = require('../models/models.js');

exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz});
};

exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
		if (req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto';
		}
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

exports.index = function(req, res) {
	models.Quiz.findAll().then(
		function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes});
		}
	).catch(function(error) { next(error);})
};

exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(
	function(quiz) {
		if (quiz) {
			req.quiz = quiz;
			next();
		} else { (new Error('No existe quizId=' + quizId)); }
	}
	).catch(function(error) { next (error);});
};

//GET /quizes/new
exports.new=function(req,res){
	var quiz =model.Quiz.build(
	{pregunta:"Pregunta",respuesta:"Respuesta"}
	);
	res.render('quizes/new', {quiz:quiz});
};

//POST /quizes/create
exports.create=function(req,res){
	var quiz =models.Quiz.build(req.body.quiz);
//guarda en DB los campos pregunta y respuesta de quiz
quiz
	.validate()
		then(
			function(err){
				if(err){
					res.render('quizes/new',{quiz: quiz , errors:err.errors });
				}else{
					quiz.save({fields:["pregunta","respuesta"]}).then(function(){
					res.redirect('/quizes')})
				}
			}
			);


};

