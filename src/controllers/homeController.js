const Contact = require('../models/ContactModel');

exports.index = async (req, res) => {
    const contact = new Contact();
    const contacts = await contact.buscaContatos();
    

    res.render('index', { contacts });
    return;
};
