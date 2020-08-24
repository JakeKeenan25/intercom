"use strict";
const {RADII} = require('./const');

(function () {
	this.greatCircleDistance = (coords) => {
		let distance = null;

		try{
			const { latitude1, longitude1, latitude2, longitude2 } = coords;
			if (latitude1 && longitude1 && latitude2 && longitude2){
				const dLat = this.getRadians(latitude2-latitude1);
				const dLon = this.getRadians(longitude2-longitude1);

				if (dLat && dLon){
					const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
									Math.cos(this.getRadians(latitude1)) * Math.cos(this.getRadians(latitude2)) * 
									Math.sin(dLon/2) * Math.sin(dLon/2);

					const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
					distance = RADII * c;
				}
			}
		}catch(e){
			console.log(`utils.greatCircleDistance(${coords}):${e}`);
		}

		return distance;
	};


	this.getRadians =(coordinate) => {
		return coordinate ? coordinate * (Math.PI/180):null;
	};
}).apply(module.exports);
