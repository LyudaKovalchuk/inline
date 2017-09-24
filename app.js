const http = require('http'),
    express = require('express'),
    app = express();

app.use('/ninja', (req, res, next) => {
    res.send('Hello world from ninja page');
});

app.use((req, res, next) => {
    res.send('Hello world');
});

app.use((err, req, res, next) => {
    res.send('Express error handler');
});

const server = http.createServer(app),
    port = process.env.PORT || 8080;

server.listen(port, (err) => {
    if(err)
        throw err;
    console.log(`Server was started successfully on port: ${port}`);
});