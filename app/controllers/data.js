/**
 * Created by Wojtek on 2016-03-15
 */

var dataProvider = require('../providers/MongoDataProvider.js').DataProvider,
    response = require('../lib/utils/Response.js');

module.exports = {
    // GET /latest
    getLatestData: function (req, res, next) {
        dataProvider.getLatestElements('data', function (error, result) {
            if (error) {
                return response.error(res, 500, error)
            } else {
                return response.success(res, result);
            }
        });
    },
    //GET /repeated
    getRepeatedData: function (req, res, next) {
        var key = 'd';

        if (req.query && req.query.valueSum) {
            key = 'sum';
        } else if (req.query && req.query.count) {
            key = 'count';
        } else {
            return response.error(res, 400, 'Wrong query string params');
        }

        dataProvider.getRepeatedElements('data', key, function (error, result) {
            if (error) {
                return response.error(res, 500, error);
            } else {
                return response.success(res, result);
            }
        });
    }
};