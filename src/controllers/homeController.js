exports.paginaInicial = (req, res) => { // Exemplos de middleware
    res.render('index', { // Injetando dados no view usando ejs (index.ejs)
        // titulo: 'Este será o titulo da página',
        numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    });
    return;
};

exports.trataPost = (req, res) => {
    res.send(req.body);
};