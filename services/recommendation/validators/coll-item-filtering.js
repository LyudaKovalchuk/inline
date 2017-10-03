const Validator = require('./validator');

class ItemCollaborativeValidator extends Validator {

    validate(query) {
        this.reject();
    }

}

module.exports = new ItemCollaborativeValidator();