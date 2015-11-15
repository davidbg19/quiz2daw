
/*tabla de materias*/

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Materia',
	{
		materia: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta la materia"}}
		},
		ensenanza: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta la enseñanza"}}
		},
		curso: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta el curso"}}
		}
	});
}