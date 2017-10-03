const config = require('config'),
    Neo4j = require('services/neo4j'),
    requireAll = require('require-all');

Neo4j.connect(config.neo4j)
    .on('completed', () => console.log('Neo4j connection was successfully established'))
    .on('error', (error) => console.log(`Neo4j driver instantiation failed: ${error}`));

const checkMigration = (name) => `MATCH (m:Migration {name: '${name}'}) RETURN m`;
const createMigration = (name) => `CREATE (m:Migration {name: '${name}'})`;

function run() {
    const folder = requireAll(`${__dirname}/migrations`);

    const migrations = Object.keys(folder)
        .map((file) => {
            const item = folder[file];
            folder[file] = (item instanceof Function) ? item : item['index'];
            if (!folder[file])
                delete folder[file];

            return file;
        })
        .sort();

    function next() {
        const nextName = migrations.shift();
        if(!nextName) return Promise.resolve();

        return Neo4j.query(checkMigration(nextName))
            .then((existing) => {
                if (existing.records && existing.records.length) {
                    console.log(`${nextName} already exists...`);
                    return Promise.resolve();
                }

                const migration = folder[nextName];
                console.log(`Start ${nextName} migration...`);
                return migration()
                    .then(() => Neo4j.query(createMigration(nextName)))
                    .then(() => console.log(`Finish ${nextName} migration...`))
            })
            .then(next);

    }

    return next()
        .then(() => console.log('Migration was successfully'))
        .then(() => Neo4j.close())
        .catch((err) => {
            Neo4j.close();
            console.error(`Error during migration: `, err)
        });
}

module.exports = run;