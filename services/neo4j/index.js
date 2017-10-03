const EventEmiter = require('events'),
    neo4j = require('neo4j-driver').v1,
    driver = Symbol('neo4j-connection');

class Neo4j extends EventEmiter {

    constructor() {
        super();
    }

    connect(config) {
        this[driver] = neo4j.driver(config.url, neo4j.auth.basic(config.authToken.user, config.authToken.password), config.config);
        this[driver].onCompleted = () => this.emit('completed');
        this[driver].onError = (error) => this.emit('error', error);

        return this;
    }

    query(query, params = {}) {
        this.checkConnection();
        const session = this[driver].session();

        return session
            .run(query, params)
            .then((result) => {
                session.close();
                return result;
            });
    }

    close() {
        this[driver].close();
    }

    checkConnection() {
        if(!this[driver]) {
            throw new Error(`Connection to Neo4j wasn't established`);
        }
    }

}

module.exports = new Neo4j();