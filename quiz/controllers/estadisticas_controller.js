exports.estadisticas = function(req, res) {
	res.render('estadisticas', {Aciertos: req.app.locals.contAciertos, Fallos: req.app.locals.contFallos});
};