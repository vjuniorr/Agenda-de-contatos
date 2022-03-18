const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    titulo: { type: String, required: true }, // Campo obrigatório e tipo String
    descricao: String
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {

}

exports = Login;