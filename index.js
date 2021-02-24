console.log('Test');
const logger = require('./services/configs').logger().getLogger('index.js');
const utils = require('./services/utils');
const {URL, HEAD_OFFICE_KM_LIMIT} = require('./services/const');

(function() {
	logger.trace('Starting');
	// Read file.
	const data = utils.readFile(URL);

	// Once promise has resolved, start work
	data.then((res) => {
		logger.info(`Res = ${res}`);
		try {
			// Create the partyList
			const partyList = [];
			if (res && res.length > 0) {
				// For each record in the array check the circle distance
				res.forEach((ele) => {
					logger.info(`ele = ${ele}`);
					// Convert to json object
					const record = JSON.parse(ele);
					if (record) {
						// calculate the distance
						const distance = utils.calculate(record.latitude, record.longitude);
						logger.info(`distance = ${distance}`);
						// Is the distance within the limit.
						if (distance <= HEAD_OFFICE_KM_LIMIT) {
							logger.info(`Add ${record.name} to party List`);
							// Make a 2d array, ele1 = userId, ele2 = party list object
							partyList.push([record.user_id, {user_id: record.user_id, name: record.name}]);
						}
					}
				});
			}
			// Sort the array by ele1 - ID
			partyList.sort(utils.sort2DArray).forEach((guest) => {
				// Print the results
				if (guest && guest.length > 0 && guest[1]) {
					console.log(guest[1]);
				}
			});
		} catch (e) {
			logger.error(`${e}`);
		}
		logger.trace('Ending');
	}).catch((e) => {
		logger.error(`${e}`);
	});
})();
