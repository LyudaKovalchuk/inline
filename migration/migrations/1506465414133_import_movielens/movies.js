module.exports = (path) =>
    "USING PERIODIC COMMIT 250 " +
    `LOAD CSV WITH HEADERS FROM '${path}' as line ` +
    "WITH line.movieId as id, line.title as title, split(line.genres, '|') as ganres " +
    "UNWIND ganres AS ganre " +
    "MERGE (m:Movie {id:id, title: title}) " +
    "MERGE (g:Ganre {name: ganre}) " +
    "MERGE (m)-[r:HAS_GANRE]->(g);";