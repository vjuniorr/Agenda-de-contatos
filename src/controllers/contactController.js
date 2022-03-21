const Contact = require('../models/ContactModel');

exports.index = async (req, res) => {
    if(!req.params.id) return res.render('404');
    const contact = new Contact();

    try {
        const result = await contact.buscaPorId(req.params.id);
        if(!result)return res.render('404');

        res.render('contact', { contact: result });
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
}

exports.register = (req, res) => {
    res.render('contact', { contact: {} });
    return;
}

exports.save = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();

        if(contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => {
                res.redirect('/contact/register');
            });
            return;
        }

        req.flash('success', 'Contato salvo com sucesso!');
        req.session.save(() => {
            res.redirect(`/contact/index/${contact.contact._id}`);
            return;
        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}