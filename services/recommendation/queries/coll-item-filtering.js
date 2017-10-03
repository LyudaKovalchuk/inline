module.exports = (query) =>
    'MATCH (p1:User {id: 44})-[x:RATE]->(m:Movie)<-[y:RATE]-(p2:User) ' +
    'WHERE p2.id < 100 ' +
    'WITH COUNT(m) AS numbermovies, SUM(x.value * y.value) AS xyDotProduct, ' +
    'SQRT(REDUCE(xDot = 0.0, a IN COLLECT(x.value) | xDot + a^2)) AS xLength, ' +
    'SQRT(REDUCE(yDot = 0.0, b IN COLLECT(y.value) | yDot + b^2)) AS yLength, ' +
    'p1, p2 WHERE numbermovies > 1 ' +
    'RETURN p1.id, p2.id, xyDotProduct / (xLength * yLength) AS sim ' +
    'ORDER BY sim DESC LIMIT 100';