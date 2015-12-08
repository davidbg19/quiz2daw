var models = require('../models/models.js'); //coje el modelo estructura de cuestionario

//QUIZES
// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find({
            where: { id: Number(quizId)},
            include: [{ model: models.Comment }]
        }).then(function(quiz) {
				if(quiz) {
					req.quiz = quiz;
					next();
				} else { next(new Error('No existe quizId=' + quizId)); }
			}
	).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(
                function(quizes) {
    res.render('quizes/index.ejs', {quizes: quizes});
});
}

// GET /quizes/:quizId
exports.show = function(req, res) {
    res.render('quizes/show', {quiz: req.quiz});
};


// GET /quizes/:id/edit
exports.edit = function(req, res) {
    var quiz = req.quiz; //autoload de instancia de quiz
    res.render('cuestionarios/edit', {quiz: quiz});
};
exports.update = function(req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    
    req.quiz
            .validate()
            .then(
            function(err){
                if(err){
                    res.render('cuestionarios/edit',{quiz: req.quiz});
                }else{
                    req.quiz
                            .save({fields:["pregunta","respuesta"]})
                            .then(function(){res.redirect('/admin/cuestionarios');});
                }
            }
        );
};



// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, cuestionarioId) {
		models.Cuestionario.find({
			where: {
				id: Number(cuestionarioId)
			},
			include: [{ model: models.Profesor }]
		}).then(function(cuestionario) {
			if(cuestionario) {
				req.cuestionario = cuestionario;
				next();
			} else { next(new Error('No existe commentId=' + cuestionarioId))}	
		}
	).catch(function(error){next(error)});
}

//  GET/cuestionarios VISTA DE LISTA CUESTIONARIOS
exports.index = function(req, res) {
	models.Cuestionario.findAll({
			include: [{ model: models.Profesor }]
		}).then(
                function(cuestionarios) {
    res.render('cuestionarios/index.ejs', {cuestionarios: cuestionarios});
});
}



// GET /cuestionarios/:id/edit
exports.edit = function(req, res) {
    var cuestionario = req.cuestionario; //autoload de instancia de cuestionario
    res.render('cuestionarios/edit', {cuestionario: cuestionario});
};

exports.update = function(req, res) {
    req.cuestionario.observaciones = req.body.cuestionario.observaciones;
    req.cuestionario.fechaFin = req.body.cuestionario.fechaFin;
    
    req.cuestionario
            .validate()
            .then(
            function(err){
                if(err){
                    res.render('cuestionarios/edit',{cuestionario: req.cuestionario});
                }else{
                    req.cuestionario
                            .save({fields:["observaciones","fechaFin"]})
                            .then(function(){res.redirect('/admin/cuestionarios');});
                }
            }
        );
};

//Borrar cuestionarios
exports.destroy = function(req, res){
	req.cuestionario.destroy().then(function(){
        res.redirect('/admin/cuestionarios');
    }).catch(function(error){next(error)});
}
// GET /cuestionarios/new
exports.new = function(req, res) {
	var cuestionario = models.Cuestionario.build( //crea objeto cuestionario
	{creador: "Creador", observaciones: "Observaciones", fechaFin: "Fecha de Finalizacion"}
	);
    res.render('cuestionarios/new', {cuestionario: cuestionario});
};

// POST /cuestionario/create
exports.create = function(req, res) {
	var cuestionario = models.Cuestionario.build( req.body.cuestionario );
	cuestionario.set('creador',req.session.profesor.id);
	cuestionario.validate()
	.then(
		function(err){
			if(err) {
			res.render('cuestionarios/new', {cuestionario: cuestionario, errors: err.errors});
			} else {
				for(prop in cuestionario.dataValues) {console.log(prop + ' - ' + cuestionario[prop])};
				cuestionario.save({fields: ["fechaFin", "observaciones", "creador"]}).then(function(){
					res.redirect('/admin/cuestionarios');
				})	//Redireccion HTTP (URL relativo) lista de cuestionarios
			}
		}
	);
};

exports.duplicar=function(req, res){
		var cuestionario = models.Cuestionario.build( req.body.cuestionario );
	cuestionario.set('fechaFin',req.cuestionario.fechaFin);
	cuestionario.set('observaciones',req.cuestionario.observaciones);
	cuestionario.set('creador',req.cuestionario.creador);
	cuestionario.validate()
	.then(
		function(err){
			if(err) {
			res.render('cuestionarios', {cuestionario: cuestionario, errors: err.errors});
			} else {
				for(prop in cuestionario.dataValues) {console.log(prop + ' - ' + cuestionario[prop])};
				cuestionario.save({fields: ["fechaFin", "observaciones", "creador"]}).then(function(){
					res.redirect('/admin/cuestionarios');
				})	//Redireccion HTTP (URL relativo) lista de cuestionarios
			}
		}
	);
	
	
};

