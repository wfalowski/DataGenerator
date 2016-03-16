/**
 * Created by Wojtek on 2016-03-15.
 */

var dataProvider = require('../providers/MongoDataProvider.js').DataProvider,
    Config = require('../../bin/config'),
    async = require('async');

var Generator = function () {
    this.config = Config.generator;
};

/**
 * Initialization of data inserting to database
 */
Generator.prototype.init = function () {
    var that = this;

    var operationsCount = this.config.initRecords / this.config.bulkLimit,
        operations = {};

    for (var i = 0; i < operationsCount; i++) {
        operations[i + 1] = this.config.bulkLimit;
    }

    dataProvider.checkCollectionAmount(that.config.collectionName, function (err, res) {
        if (that.config.forceDrop && res && res !== 0) {

            dataProvider.clearCollection(that.config.collectionName, function (err2, res2) {
                if (err2) {
                    console.info('Clear collection error, please restart the app');
                } else {

                    console.info('Collection %s cleared', that.config.collectionName);

                    that.insertData(operations, function (res) {
                        if (res) {
                            console.info('All data inserted into database');
                        }
                    });
                }
            });
        }
        else if (res === 0) {
            that.insertData(operations, function () {
                console.info('All data inserted into database');
            });
        } else {
            console.info('Collection is not empty - use forceDrop flag to reload collection');
        }
    });
};

/**
 * Insert data to collection
 * @param operations
 * @param callback
 */
Generator.prototype.insertData = function (operations, callback) {
    var that = this,
        insertedElements = 0;

    console.info('Inserting data process started...');

    async.each(operations, function (operation, cb) {

        that.generateObjects(operation, function (res) {
            dataProvider.insertMultipleRecords(res, that.config.collectionName, function (err, res2) {
                if (err) {
                    return cb(err);
                }
                insertedElements += operation;
                console.info(insertedElements + ' elements from ' + that.config.initRecords + ' inserted into collection');
                return cb();
            });
        });
    }, function (err) {
        if (err) {
            console.info('Data insert error', err);
            return callback(err);
        } else {
            return callback(true);
        }
    });
};

/**
 * Generate objects array
 * @param number
 * @param callback
 */
Generator.prototype.generateObjects = function (number, callback) {
    var that = this,
        objects = [];

    //Providing different created_at time
    setTimeout(function () {
        async.whilst(function () {
                return objects.length < number
            },
            function (next) {
                setTimeout(function () {

                    objects.push(that.getObject());
                    next();

                }, that.getRandomFloat(0, 10));
            },
            function () {
                return callback(objects);
            });
    }, that.getRandomFloat(0, 50));

    //Without providing different created_at
    //for(var i =0; i < number, i++) {
    //    objects.push(that.getObject());
    //}
    //return callback(objects);

};

/**
 * Get single object
 * @returns {{value, title, created_at: Date}}
 */
Generator.prototype.getObject = function () {
    return {
        value: this.getRandomFloat(this.config.floatLimit.min, this.config.floatLimit.max),
        title: this.getRandomLetter(),
        created_at: new Date()
    };
};

/**
 * Get Random float number
 * @param min minimal number
 * @param max maximum number
 * @returns {*}
 */
Generator.prototype.getRandomFloat = function (min, max) {
    return Math.random() * (max - min) + min;
};

/**
 * Get single random letter
 * @returns {*}
 */
Generator.prototype.getRandomLetter = function () {
    return this.config.charArray[Math.floor(Math.random() * this.config.charArray.length)];
};

exports.Generator = Generator;