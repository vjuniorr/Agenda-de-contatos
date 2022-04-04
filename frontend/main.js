import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Form';

const login = new Login('.form-login');
const register = new Login('.form-register');

login.init();
register.init();