/**
 * Created by Wojtek on 2016-03-15.
 */


var MongoClient = require('mongodb').MongoClient,
    Config = require('../../bin/config');

var MongoDataProvider = function () {
    this.db = {};
    this.config = Config.database;
    this.prepareConnectionUrl();
};

MongoDataProvider.instance = null;

/**
 * Prepare and set mongodbs connection url based on configuration
 */
MongoDataProvider.prototype.prepareConnectionUrl = function () {
    this.url = "mongodb://";
    this.url += this.config.user + ':';
    this.url += this.config.password + '@';
    this.url += this.config.host + ':';
    this.url += this.config.port + '/';
    this.url += this.config.db;
};

/**
 * Establish connection with database
 * @param callback
 */
MongoDataProvider.prototype.connect = function (callback) {
    var that = this;

    MongoClient.connect(this.url, function (err, db) {
        if (err) {
            return callback(err);
        }
        console.info("MongoDataProvider :: Connected correctly to database.");
        that.db = db;
        return callback();
    });
};

/**
 * Check collection amount
 * @param collection name of collection
 * @param callback amount of collection
 */
MongoDataProvider.prototype.checkCollectionAmount = function (collection, callback) {
    this.db.collection(collection).count(function (err, res) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, res);
        }
    });
};

/**
 * Insert multiple elements array to database (max 1000)
 * @param array array with elements
 * @param collection name of collection
 * @param callback error or true
 */
MongoDataProvider.prototype.insertMultipleRecords = function (array, collection, callback) {
    var bulk = this.db.collection(collection).initializeUnorderedBulkOp();

    for (var i in array) {
        if (array.hasOwnProperty(i)) {
            bulk.insert(array[i]);
        }
    }
    bulk.execute(function (err) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, true);
        }
    })
};

/**
 * Very slow in case of inserting 100 000 records at one time
 * @param object one model to insert
 * @param collection
 * @param callback
 */
MongoDataProvider.prototype.insertRecord = function (object, collection, callback) {
    this.db.collection(collection).insertOne(object, function (err) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, true);
        }
    });
};

/**
 * Get 25 latest elements from database
 * @param collection name of collection
 * @param callback error or result
 */
MongoDataProvider.prototype.getLatestElements = function (collection, callback) {
    this.db.collection(collection).aggregate(
        [
            {
                $sort: {
                    _id: -1
                }
            }, {
            $limit: 25
        }
        ],
        function (err, res) {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, res);
            }
        });
};

/**
 * Get 25 most repeated elements from database
 * @param collection
 * @param callback
 */
MongoDataProvider.prototype.getRepeatedElements = function (collection, key, callback) {
    var projectQuery = {
        _id: 0,
        title: "$_id"
    };

    switch (key) {
        case 'count':
            projectQuery.count = 1;
            break;
        case 'sum':
            projectQuery.valueSum = 1;
            break;
        default:
            projectQuery.count = 1;
    }

    this.db.collection(collection).aggregate(
        [
            {
                $group: {
                    _id: "$title",
                    count: {$sum: 1},
                    valueSum: {$sum: "$value"}
                }
            }, {
                $sort: {
                     count: -1
                 }
             },
            {
                $project: projectQuery
            },
            {
                $limit: 25
            }
        ],
        function (err, res) {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, res);
            }
        });
};

/**
 * Clear choosen collection in database
 * @param collection
 * @param callback
 */
MongoDataProvider.prototype.clearCollection = function (collection, callback) {
    this.db.collection(collection).drop(function (err, res) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, res);
        }
    });
};

/**
 * Get dataProvider object
 * @returns {null|MongoDataProvider|*}
 */
MongoDataProvider.getInstance = function () {
    if (this.instance === null) {
        this.instance = new MongoDataProvider();
    }
    return this.instance;
};

module.exports.DataProvider = MongoDataProvider.getInstance();