const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.redirect('/');
    res.render('login');
    return;
};

exports.login = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.login()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login/index');
            });

            return;
        }

        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('/');
        });

    } catch (e) {
        console.log(e);
        res.render('404');
        return;
    }
}

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
}