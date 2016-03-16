/**
 * Created by Wojtek on 2016-03-15
 */

var express = require('express');

var dataController = require('../controllers/data');

module.exports = (function () {
    var router = express.Router();

    //Get latest inserts
    router.get('/latest', dataController.getLatestData);

    //Get repeated data
    router.get('/repeated', dataController.getRepeatedData);

    return router;
})();