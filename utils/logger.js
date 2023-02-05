const winston = require("winston");
const LOGCONFIG = require("../config/log.js");

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp({ format: LOGCONFIG.FILE_FORMAT }),
		winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
	),
	transports: [
		new winston.transports.File({
			filename: LOGCONFIG.FILE,
			json: LOGCONFIG.ISJSON,
			maxsize: LOGCONFIG.FILE_SIZE,
			maxFiles: LOGCONFIG.MAX_FILES,
		}),
		new winston.transports.Console(),
	],
});


module.exports = {logger};
