const Neo4j = require('services/neo4j'),
    collUserFiltering = require('./queries/coll-user-filtering'),
    collItemFiltering = require('./queries/coll-item-filtering'),
    contentFiltering = require('./queries/content-filtering'),
    collUserFilteringValidator = require('./validators/coll-user-filtering'),
    collItemFilteringValidator = require('./validators/coll-item-filtering'),
    contentFilteringValidator = require('./validators/content-filtering');

const ValidatorsMapper = {
    'coll-item-filtering': collItemFilteringValidator,
    'coll-user-filtering': collUserFilteringValidator,
    'content-filtering': contentFilteringValidator
};

const QueryMapper = {
    'coll-item-filtering': collItemFiltering,
    'coll-user-filtering': collUserFiltering,
    'content-filtering': contentFiltering
};


class RecommendationService {

    constructor() {
        this.Query = Query;
    }

    recommend(query) {
        const validator = ValidatorsMapper[query.type],
            neoQueryTemplate = QueryMapper[query.type];

        if(!validator || !query)
            throw new Error('Bad request');

        validator.validate(query);
        return Neo4j.query(neoQueryTemplate(query));
    }

}

class Query {

    constructor(object) {
        this.type = object.type;
        this.titles = object.titles;
    }

}

module.exports = {
    RecommendService: new RecommendationService(),
    Query: Query
};