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

module.exports = {
    sendOkResponse,
    sendBadResponse
}
