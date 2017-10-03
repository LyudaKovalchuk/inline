

class Validator {

    reject(query) {
        throw new Error('Reject on validation');
    }

    validate(query) {
        throw new Error('Not implemented validator');
    }
}

module.exports = Validator