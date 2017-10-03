const config = require('config'),
    http = require('http'),
    express = require('express'),
    app = express(),
    Neo4J = require('services/neo4j'),
    bodyParser = require('body-parser');

Neo4J.connect(config.neo4j)
    .on('completed', () => console.log('Neo4j connection was successfully established'))
    .on('error', (error) => console.log(`Neo4j driver instantiation failed: ${error}`));

const server = http.createServer(app),
    port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('router'));

server.listen(port, (err) => {
    if(err)
        throw err;

    Neo4J.checkConnection();
    console.log(`Server was started successfully on port: ${port}`);
});