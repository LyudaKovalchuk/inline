const Validator = require('./validator');

class UserCollaborativeValidator extends Validator {

    validate(query) {
        this.reject();
    }

}

module.exports = new UserCollaborativeValidator();