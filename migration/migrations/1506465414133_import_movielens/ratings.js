module.exports = (path) =>
    "USING PERIODIC COMMIT 250 " +
    `LOAD CSV WITH HEADERS FROM '${path}' as line ` +
    "MERGE (m:Movie {id: line.movieId}) " +
    "MERGE (u:User {id: line.userId}) " +
    "MERGE (u)-[r:RATE {value: line.rating, timestamp: line.timestamp}]->(m);";