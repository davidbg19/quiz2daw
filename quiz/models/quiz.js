<<<<<<< HEAD


=======
>>>>>>> 9a7f6282a951cbb66bf4940b005a31c494b2d610
//Definición del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
	{
		pregunta: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta Pregunta"}}
		},
		respuesta: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta Respuesta"}}
		}
	});
}