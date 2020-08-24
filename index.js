const utils = require('./services/utils');
const {URL, HEAD_OFFICE_KM_LIMIT} = require('./services/const');

(function () {
	const data = utils.readFile(URL);

	data.then(res => {
		try{
			const partList = [];
			if (res && res.length > 0){
				res.forEach(ele => {
					const record = JSON.parse(ele);
					if (record){
						const distance = utils.calculate(record.latitude, record.longitude);
						if (distance <= HEAD_OFFICE_KM_LIMIT){
							partList.push([record.user_id,{user_id:record.user_id, name:record.name}]);
						}
					}
				});
			}
			partList.sort(utils.sort2DArray).forEach(guest => {
				if (guest && guest.length > 0 && guest[1]){
					console.log(guest[1]);
				}
			});
		}catch(e){
			console.log(`index:${e}`);
		}
	}).catch(e => {
		console.log(`index:${e}`);
	});
})();
