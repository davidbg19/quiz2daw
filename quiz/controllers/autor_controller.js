// GET /autores
exports.list = function(req, res) {
    listaAutores = ['Alberto Sierra', 'Pedro Pérez'];
    res.render('autores/autores', {varAutores: listaAutores});
};
