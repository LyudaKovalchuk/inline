module.exports = (path) =>
    `LOAD CSV WITH HEADERS FROM '${path}' as line ` +
    "MERGE (m:Movie {id: line.movieId}) " +
    "ON MATCH SET m.imdb = line.imdbId;";