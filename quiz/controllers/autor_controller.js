// GET /autores
exports.list = function(req, res) {
    listaAutores = ['Alberto Sierra', 'Pedro Pérez','Nicolas Canovas'];
    res.render('autores/autores', {varAutores: listaAutores});
};
