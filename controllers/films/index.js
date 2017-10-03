const { RecommendService, Query } = require('services/recommendation'),
    Neo4j = require('services/neo4j'),
    titleContainsQuery = require('./queries/withTitle');

class FilmsController {

    recommend(req, res, next) {
        if (!req.body)
            return res.sendStatus(400);

        RecommendService.recommend(new Query(req.body))
            .then((response) => {
                if (!response || !response.records)
                    res.json(404);

                return response.records
                    .filter((record) => record.length)
                    .map((record) => record['_fields'])
                    .filter(Boolean)
                    .map(([title, ganres, common]) => {
                        return {title, ganres, common: common.low};
                    });
            })
            .then((films) => res.json(films))
            .catch((error) => res.sendStatus(400));
    }

    getFilmsByTitle(req, res, next) {
        if (!req.params || !req.params.title)
            return res.sendStatus(400);

        Neo4j.query(titleContainsQuery(req.params.title.replace("_", " ")))
            .then((response) => {
                if (!response || !response.records)
                    res.json(404);

                return response.records
                    .filter((record) => record.length)
                    .map((record) => record['_fields'])
                    .filter(Boolean)
                    .map((fields) => fields.pop())
                    .map((fields) => fields.properties);
            })
            .then((films) => res.json(films))
            .catch((err) => res.sendStatus(400));
    }
}

module.exports = FilmsController;