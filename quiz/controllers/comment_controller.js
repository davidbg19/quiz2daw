var models = require('../models/models.js');

// Autoload :id de comentarios
exports.load = function(req, res, next, commentId) {
		models.Comment.find({
			where: {
				id: Number(commentId)
			}
		}).then(function(comment) {
			if(comment) {
				req.comment = comment;
				next();
			} else { next(new Error('No existe commentId=' + commentId))}	
		}
	).catch(function(error){next(error)});
}

//GET /quizes/:quizId/comments/new
exports.new = function(req, res){
    res.render('comments/new.ejs',{quiz: req.quiz, cuestionario:req.cuestionario});
};

// POST /quizes/:quizId/comments
exports.create = function(req, res){
    var comment = models.Comment.build(
            { texto: req.body.comment.texto,
                QuizId: req.params.quizId, cuestionario:req.cuestionario
            });
            comment.validate()
                    .then(
            function(err){
                if(err){
                res.render('/admin/cuestionarios/'+req.cuestionario.id+'/quizes/'+req.params.quizId,
                {comment: comment, quizid: req.params.quizId});
            }else{
                comment
                        .save()
                        .then(function(){ res.redirect('/admin/cuestionarios/'+req.cuestionario.id+'/quizes/'+req.params.quizId)})
            }  
            }        
            ).catch(function(error){next(error)});
};

// GET /quizes/:quizId/comments/:commentId/publish
exports.publish = function(req,res) {
	req.comment.publicado = true;
	req.comment.save( {fields: ["publicado"]})
		.then(function(){ res.redirect('/admin/cuestionarios/'+req.cuestionario.id+'/quizes/'+req.params.quizId);} )
		.catch(function(error){next(error)});
};
