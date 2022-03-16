const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    titulo: { type: String, required: true }, // Campo obrigatório e tipo String
    descricao: String
});

const HomeModel = mongoose.model('Home', HomeSchema);

class Home {

}

exports = Home;