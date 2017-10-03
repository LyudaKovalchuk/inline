const config = require('config'),
    fs = require('fs'),
    s3 = require('services/aws/s3'),
    decompress = require('decompress'),
    Neo4j = require('services/neo4j'),
    cleanall = require('./cleanall'),
    movies = require('./movies'),
    ratings = require('./ratings'),
    tags = require('./tags'),
    links = require('./links');

function movieLensMigration() {

    return new Promise((resolve, reject) => {
        s3.getObject({Bucket: config.aws.s3.bucket, Key: config.aws.s3.movielens_key})
            .createReadStream()
            .pipe(fs.createWriteStream(config.aws.s3.movielens_key))
            .on('finish', () => {

                decompress(config.aws.s3.movielens_key, 'tmp/')
                    .then(() => {
                        const movielensDir = 'file://' + process.cwd() + '/tmp/' + config.aws.s3.movielens_key.replace(".zip", ""),
                            importPromise = (query, name) => Neo4j.query(query)
                                .then((result) => console.log(`${name} importing was successful`))
                                .catch((error) => {
                                    console.error(`${name} importing failed, cause of: ${error}`);
                                    throw error;
                                });

                        Neo4j.query(cleanall())
                            .then((result) => importPromise(movies(`${movielensDir}/movies.csv`), 'Movies'))
                            .then((result) => importPromise(ratings(`${movielensDir}/ratings.csv`), 'Ratings'))
                            .then((result) => importPromise(tags(`${movielensDir}/tags.csv`), 'Tags'))
                            .then((result) => importPromise(links(`${movielensDir}/links.csv`), 'Links'))
                            .then((result) => resolve(result))
                            .catch(error => reject(error));
                    })
                    .catch(error => reject(error));

            })
            .on('error', (error) => reject(error));
    });
}

module.exports = movieLensMigration;