const {createLogger, format, transports} = require('winston');
const {combine, timestamp, simple} = format;

const appLogger = createLogger({
    level: 'verbose',
    format: combine(
        timestamp(),
        simple(),
    ),
    transports: [
        new transports.Console(),
    ]
})

module.exports = {
    appLogger
}