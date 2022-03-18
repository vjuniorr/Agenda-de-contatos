const Register = require('../models/RegisterModel');

exports.index = (req, res) => {
    res.render('register');
    return;
};

exports.register = async function (req, res) {
    try {
        const register = new Register(req.body);
        await register.register()

        if (register.errors.length > 0) {
            req.flash('errors', register.errors);
            req.session.save(function () {
                return res.redirect('/register/index');
            });

            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(function () {
            return res.redirect('/login/index');
        });

    } catch (e) {
        console.log(e);
        res.render('404');
        return;
    }
};