module.exports = (title) =>
    'MATCH (m:Movie) ' +
    `WHERE LOWER(m.title) CONTAINS(LOWER('${title}')) ` +
    'RETURN m;';
