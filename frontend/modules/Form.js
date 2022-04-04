export default class Form {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.event();
    }

    event() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
    }


}