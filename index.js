const express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');

var app = express();
var adminRouter = express.Router();

var server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use("/public", express.static(__dirname + '/public'));

require('./database/database');
require('./serverRoutes/routes')(app, adminRouter);

app.route('/*').get(function(req, res) {
    res.sendFile(path.resolve('./public' + '/index.html'));
});

var port = 5000;
server.listen(port, function() {
    console.log('server is running on port ' + port);
})