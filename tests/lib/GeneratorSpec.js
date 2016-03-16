/**
 * Created by Wojtek on 2016-03-16.
 */

var generator = require('../../app/lib/Generator.js').Generator;

describe('Generator test', function () {

    var instance = null;

    beforeEach(function () {
        instance = new generator();
    });

    afterEach(function () {
        delete instance;
    });

    it("Generator class structure", function () {
        expect(generator).toBeDefined();
        expect(instance).toBeDefined();

        expect(instance.init).toBeDefined();
        expect(instance.insertData).toBeDefined();
        expect(instance.generateObjects).toBeDefined();
        expect(instance.getObject).toBeDefined();
        expect(instance.getRandomFloat).toBeDefined();
        expect(instance.getRandomLetter).toBeDefined();
    });
});