const assert = require("assert");
const formula = require("../services/formulas.js");
const testData = require("./testData");

describe("formulas.js Testing....", function (){

	describe(`greatCircleDistance(${testData.greatCircleDistance_input})`, function (){
		it('Should return result as an array.', function(){
			let circleDistance = formula.greatCircleDistance(testData.greatCircleDistance_input);
			assert.deepEqual(circleDistance, testData.greatCircleDistance_output);
		});
		it('Should return null from invalid data.', function(){
			let circleDistance = formula.greatCircleDistance();
			assert.deepEqual(circleDistance, null);
		});
	});

	describe(`getRadians(${testData.getRadians_input})`, function (){
		it(`Should return ${testData.getRadians_output}`, function(){
			assert.deepEqual(formula.getRadians(testData.getRadians_input), testData.getRadians_output);
		});
		it(`Should return null with invalid data`, function(){
			assert.deepEqual(formula.getRadians(), null);
		});
	});
});