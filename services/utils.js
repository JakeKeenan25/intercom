const axios = require("axios");
const { greatCircleDistance} = require('./formulas');
const { HEAD_OFFICE}  = require('./const');

(function () {
	this.readFile = (location) => {
		return new Promise((resolve, reject) => {
			if (!location){
				console.log(`utils.readFile(${location}):Invalid Param`);
				reject(null);
				return;
			}

			try{
				axios({
					'url':location.trim(),
					'method':'GET',
					'headers': {
						'Content-Type': 'application/json',
					}
				}).then(res => {
					if (res && res.data && res.data.length > 0){
						resolve(res.data.toString().split('\n'));
					}
				}).catch(e => {
					console.log(`utils.readFile(${location}):${e}`);
					reject(null);
					return;
				})
			}catch(e){
				console.log(`utils.readFile(${location}):${e}`);
					reject(null);
					return;
			}
		})
	}

	this.calculate = (latitude, longitude) => {
		let distance = null;

		if (latitude && longitude){
			try{
				const coords = {
					latitude1: HEAD_OFFICE.latitude,
					longitude1: HEAD_OFFICE.longitude,
					latitude2: latitude,
					longitude2: longitude
				};
				distance = greatCircleDistance(coords);
			}catch(e){
				console.log(`utils.calculate(${latitude},${longitude}):${e}`);
			}
		}

		return distance;
	}

	this.sort2DArray = (a, b) => {
		if (a[0] === b[0]) {
			return 0;
		}else {
			return (a[0] < b[0]) ? -1 : 1;
		}
	}
}).apply(module.exports);
