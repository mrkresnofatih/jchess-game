const buildOkMethodResponse = (data) => {
    return {
        "data": data,
        "error": null 
    }
}

const buildBadMethodResponse = (err) => {
    return {
        "data": null,
        "error": err 
    }
}

module.exports = {
    buildOkMethodResponse,
    buildBadMethodResponse
}
