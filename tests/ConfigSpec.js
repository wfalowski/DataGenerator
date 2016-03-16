/**
 * Created by Wojtek on 2016-03-16.
 */

var Config = require('../bin/config.js');

describe('Configuration test', function () {

    it("Proper config", function () {
        expect(Config).toBeDefined();
        expect(Config.database).toBeDefined();
        expect(Config.generator).toBeDefined();

        expect(Config.database.user).toBeDefined();
        expect(Config.database.password).toBeDefined();
        expect(Config.database.host).toBeDefined();
        expect(Config.database.port).toBeDefined();
        expect(Config.database.db).toBeDefined();

        expect(Config.generator.forceDrop).toBeDefined();
        expect(Config.generator.forceDrop).toBeFalsy();
        expect(Config.generator.bulkLimit).toBeDefined();
        expect(Config.generator.charArray).toBeDefined();
        expect(Config.generator.collectionLimit).toBeDefined();
        expect(Config.generator.collectionName).toBeDefined();
        expect(Config.generator.floatLimit).toBeDefined();
        expect(Config.generator.floatLimit.min).toBeDefined();
        expect(Config.generator.floatLimit.max).toBeDefined();
        expect(Config.generator.initRecords).toBeDefined();
    });
});