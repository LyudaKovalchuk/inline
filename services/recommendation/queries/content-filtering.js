module.exports = (query) => {
    return 'MATCH (m:Movie)-[:HAS_GANRE]->(g:Ganre)<-[:HAS_GANRE]-(rec:Movie) ' +
        `WHERE m.title IN [${query.titles.map(title => `'${title}'`).join(', ')}] ` +
        'WITH rec, COLLECT(g.name) AS genres, COUNT(*) AS commonGenres ' +
        'RETURN rec.title, genres, commonGenres ' +
        'ORDER BY commonGenres DESC LIMIT 10;';
};


// MATCH (u:User {id: 20})-[r:RATE]->(m:Movie),
// (m)-[:HAS_GANRE]->(g:Ganre)<-[:HAS_GANRE]-(rec:Movie)
// WHERE NOT EXISTS( (u)-[:RATE]->(rec) )
// WITH rec, [g.name, COUNT(*)] AS scores
// RETURN rec.title AS recommendation,
//     COLLECT(scores) AS scoreComponents,
//     REDUCE (s=0,x in COLLECT(scores) | s+x[1]) AS score
// ORDER BY score DESC LIMIT 3