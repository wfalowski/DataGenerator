/**
 * Created by Wojtek on 2016-03-16.
 */

module.exports = {
    // POST /group
    error: function (res, code, message) {
        res.status(code).json({status: "ERROR", code: code, message: message});
    },
    success: function (res, object) {
        res.status(200).json({status: "OK", code: 200, result: object});
    }
};