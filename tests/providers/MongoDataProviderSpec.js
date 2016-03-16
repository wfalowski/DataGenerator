/**
 * Created by Wojtek on 2016-03-16.
 */

var dataProvider = require('../../app/providers/MongoDataProvider.js').DataProvider;

describe('DataProvider test', function () {

    it("Class bad structure", function () {
        expect(dataProvider).toBeDefined();

        expect(dataProvider.prepareConnectionUrl).toBeDefined();
        expect(dataProvider.connect).toBeDefined();
        expect(dataProvider.checkCollectionAmount).toBeDefined();
        expect(dataProvider.insertMultipleRecords).toBeDefined();
        expect(dataProvider.getLatestElements).toBeDefined();
        expect(dataProvider.getRepeatedElements).toBeDefined();
        expect(dataProvider.clearCollection).toBeDefined();

    });
});