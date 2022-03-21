const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    nome: { type: String, required: true }, // Campo obrigatório e tipo String
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now}
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async register() {
        this.valida();
        if(this.errors.length > 0) return;
        this.contact = await ContactModel.create(this.body);
    }

    async buscaPorId(id) {
        if(typeof id !== 'string') return;
        const user = await ContactModel.findById(id);
        return user;
    }

    async edit(id) {
        if(typeof id !== 'string') return;
        this.valida();
        if(this.errors.length > 0) return;
        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    valida() {
        this.cleanUp();

        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido');
        if(!this.body.nome) this.errors.push('É necessário informar o nome do contato');
        if(!this.body.email && !this.body.telefone){
            this.errors.push('É necessário informar o email ou telefone do contato');
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        };
    }
}

module.exports = Contact;