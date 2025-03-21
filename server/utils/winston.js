var appRoot = require('app-root-path');
var winston = require('winston');

var options = {
	info: {
		level: 'info',
		filename: `${appRoot}/logs/info.log`,
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: true,
	},
	debug: {
		level: 'debug',
		filename: `${appRoot}/logs/debug.log`,
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: true,
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true,
	},
};

var logger = winston.createLogger({
	levels: {
		error: 0,
		warn: 2,
		help: 3,
		data: 4,
		debug: 5,
		info: 6,
		prompt: 7,
		verbose: 8,
		input: 9,
		trace: 10,
	},
	transports: [
//		new winston.transports.File(options.info),
		new winston.transports.File(options.debug),
		new winston.transports.Console(options.console)
	],
	exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
	write: function(message, encoding) {
		logger.info(message);
	},
};

module.exports = logger;
