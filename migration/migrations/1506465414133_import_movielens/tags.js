module.exports = (path) =>
    "USING PERIODIC COMMIT 250 " +
    `LOAD CSV WITH HEADERS FROM '${path}' as line ` +
    "MERGE (m:Movie {id: line.movieId}) " +
    "MERGE (u:User {id: line.userId}) " +
    "MERGE (u)-[r:TAG {value: line.tag, timestamp: line.timestamp}]->(m);";