/**
 * Created by Wojtek on 2016-03-15.
 */

module.exports = {
    database: {
        user: 'admin',
        password: 'admin',
        host: 'ds035027.mlab.com',
        port: '35027',
        db: 'data-generator'
    },
    generator: {
        forceDrop: false,          //True only if we allow to clear collection on start
        bulkLimit: 1000,
        initRecords: 100000,
        collectionName: 'data',
        collectionLimit: 100000,
        floatLimit: {
            min: 1
            max: 4096
        },
        charArray: "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz"
    }
};