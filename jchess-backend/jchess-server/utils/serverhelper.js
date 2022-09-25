const { validationResult } = require("express-validator")
const { appLogger } = require("./logging")

const sendOkResponse = (res, data) => {
    return res.status(200).send({
        "data": data,
        "errorMessage": null
    })
}

const sendBadResponse = (res, error) => {
    return res.status(400).send({
        "data": null,
        "errorMessage": error
    })
}

const schemaValidationErrorHandler = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        errors.array().forEach(err => appLogger.error(`${err.location} field ${err.param} is invalid! Cause: ${err.msg}! ActualValue: ${err.value}`))
        sendBadResponse(res, "request validation error")
    } else {
        next();
    }
}

module.exports = {
    sendOkResponse,
    sendBadResponse,
    schemaValidationErrorHandler
}
