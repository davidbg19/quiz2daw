var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :userId
exports.load = function(req, res, next, userId) {
	models.User.find({
		where : {
			id : Number(userId)
		},
	}).then(function(user) {
		if (user) {
			req.user = user;
			next();
		} else {
			next(new Error('No existe userId=' + userId));
		}
	}).catch(function(error) {
		next(error);
	});
};

// Autenticar con la base de datos de usuarios
exports.autenticar = function(login, pass, callback){
	models.User.find({
			where: {username: login, password: pass}
		}).then(function(user){
			if(user){
				callback(null, user);
			}else{callback(new Error('Error al introducir los datos'));}
		}
	).catch(function(error){ next(error)});
};


//Muestra los usuarios
exports.index = function(req, res) {
	models.User.findAll().then(
		function(users){
			res.render('users/index.ejs', {users: users});
		}
	).catch(function(error){next(error);})
};

exports.edit=function(req,res){
    var user=req.user;//autoload de instancia de quiz
    res.render('users/edit', {user : user});
};

exports.update=function(req,res){
    req.user.username = req.body.user.username;
    req.user.password = req.body.user.password;
    
    req.user
            .validate()
            .then(
            function(err){
                if(err){
                res.render('users/edit', {user: req.user, errors: err.errors});
            }else  {
                req.user
                        .save({fields:["username", "password"]})
                        .then(function(){res.redirect('/users/');});
            }
        }
    );
};

//Elimina users

exports.destroy = function(req, res) {
	req.user.destroy().then(function() {
		res.redirect('/users');
	}).catch(function(error) {
		next(error)
	});
}; 