module.exports = {
    neo4j: {
        url: process.env.NEO4J_URL,
        authToken: {
            user: process.env.NEO4J_USER,
            password: process.env.NEO4J_PASSWORD
        },
        config: {}
    }
};