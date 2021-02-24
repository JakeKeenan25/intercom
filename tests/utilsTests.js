const assert = require('assert');
const utils = require('../services/utils');
const testData = require('./testData');

describe('utils.js Testing....', function() {
	describe(`readFile(${testData.readFile_input})`, function() {
		it('Should return result as an array.', function(done) {
			const readFile = utils.readFile(testData.readFile_inputL);
			readFile.then((res) => {
				assert.deepEqual(testData.readFile_output, res);
			}).then(done, done);
		});
		it('Should return null from invalid data.', function(done) {
			const readFile = utils.readFile();
			readFile.catch((res) => {
				assert.deepEqual(res, null);
			}).then(done, done);
		});
	});

	describe(`calculate(${testData.calculate_input})`, function() {
		it(`Should return ${testData.calculate_output}`, function() {
			const distance = utils.calculate(testData.calculate_input.lat, testData.calculate_input.long);
			assert.deepEqual(distance, testData.calculate_output);
		});
		it(`Should return null from invalid data`, function() {
			const distance = utils.calculate();
			assert.deepEqual(distance, null);
		});
	});

	describe(`sort2DArray(${testData.sort2DArray_input.toString()})`, function() {
		it(`Should return ${testData.sort2DArray_output}`, function() {
			assert.deepEqual(testData.sort2DArray_input.sort(utils.sort2DArray), testData.sort2DArray_output);
		});
	});
});
