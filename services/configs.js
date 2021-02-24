(function() {
	/**
	 * Init logger
	 */
	this.logger = () => {
		const log4js = require('log4js');
		log4js.configure({
			appenders: {
				intercomLogs: {type: 'file', filename: 'intercom.log'},
				console: {type: 'console'},
			},
			categories: {
				default: {appenders: ['intercomLogs'], level: 'trace'},
			},
		});
		return log4js;
	};
}).apply(module.exports);
