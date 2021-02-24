const axios = require('axios');
const {greatCircleDistance} = require('./formulas');
const {HEAD_OFFICE} = require('./const');
const logger = require('./configs').logger().getLogger('utils.js');

(function() {
	/**
	 * Makes an axios get request to a passed url location
	 * @param {string} location
	 * @return {promise} Array where every element is a new line from the request.
	 */
	this.readFile = (location) => {
		logger.info(`readFile location = ${location}`);
		return new Promise((resolve, reject) => {
			if (!location) {
				logger.error(`readFile(${location}):Invalid Param`);
				reject(null);
				return;
			}

			try {
				axios({
					'url': location.trim(),
					'method': 'GET',
					'headers': {
						'Content-Type': 'application/json',
					},
				}).then((res) => {
					if (res && res.data && res.data.length > 0) {
						resolve(res.data.toString().split('\n'));
					}
				}).catch((e) => {
					logger.error(`readFile(${location}):${e}`);
					reject(null);
					return;
				});
			} catch (e) {
				logger.error(`readFile(${location}):${e}`);
				reject(null);
				return;
			}
		});
	};

	/**
	 * Calculates the distance between 2 coordinates
	 * using the greatCircleDistance formula.
	 * @param {string} latitude
	 * @param {string} longitude
	 * @return {string} null or distance
	 */
	this.calculate = (latitude, longitude) => {
		logger.info(`readFile calculate = ${latitude}, ${longitude}`);
		let distance = null;

		if (latitude && longitude) {
			try {
				const coords = {
					latitude1: HEAD_OFFICE.latitude,
					longitude1: HEAD_OFFICE.longitude,
					latitude2: latitude,
					longitude2: longitude,
				};
				distance = greatCircleDistance(coords);
			} catch (e) {
				logger.error(`calculate(${latitude},${longitude}):${e}`);
			}
		}

		return distance;
	};

	/**
	 * @param  {array} a
	 * @param  {array} b
	 * @return {string} null or distance
	 */
	this.sort2DArray = (a, b) => {
		if (a[0] === b[0]) {
			return 0;
		} else {
			return (a[0] < b[0]) ? -1 : 1;
		}
	};
}).apply(module.exports);
