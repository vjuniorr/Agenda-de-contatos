const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const RegisterSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

class Register {
    constructor(body) {
        this.body = body
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valida();
        if(this.errors.length > 0) return;

        await this.userExists();
        if(this.errors.length > 0) return;

        const salt = bcrypt.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, salt);

        this.user = await RegisterModel.create(this.body);
    }

    async userExists() {
        const user = await RegisterModel.findOne({ email: this.body.email });
        if(user) this.errors.push('Usuário já existe');
    }

    valida() {
        this.cleanUp();

        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido');
        if(this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('Senha deve ter entre 3 e 50 caracteres');
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        
        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Register;