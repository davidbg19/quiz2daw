var models = require('../models/models.js');

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