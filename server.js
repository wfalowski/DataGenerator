/**
 * Created by Wojtek on 2016-03-15
 */

var express = require('express'),
    app = express(),
    dataProvider = require('./app/providers/MongoDataProvider.js').DataProvider,
    Generator = require('./app/lib/Generator.js').Generator,
    dataRouting = require('./app/routes/data');

var generator = new Generator();

dataProvider.connect(function (err) {
    if (err) {
        console.error('Can not connect with database (check connection config): ', err);
        process.exit(1);
    }
    app.listen(3000, function () {
        generator.init();

        app.use('/api', dataRouting);
        console.info('Server listening on port 3000');
    });
});