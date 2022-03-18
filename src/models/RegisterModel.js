const mongoose = require('mongoose');
const validator = require('validator');

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

        try{
            await RegisterModel.create(this.body);
        }catch(e) {
           console.log(e);
        }
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