const Validator = require('./validator');

class ContentFilteringValidator extends Validator {

    validate(query) {
        const titles = query.titles;

        if(Array.isArray(titles) && titles.length && titles.every((title) => typeof title === 'string')) {
            return true;
        }

        this.reject();
    }

}

module.exports = new ContentFilteringValidator();