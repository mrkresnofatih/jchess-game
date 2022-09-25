const { checkSchema } = require('express-validator')

const newMoveRequestModelValidatorMiddleware = checkSchema({
    gameId: {
        in: ['body'],
        isEmpty: {
            negated: true,
            errorMessage: 'gameId is empty'
        },
    },
    moveBy: {
        in: ['body'],
        custom: {
            options: value => {
                if (value === undefined) {
                    return Promise.reject("moveBy is undefined")
                } else {
                    if (["home", "away"].includes(value)) {
                        return Promise.resolve()
                    } else {
                        return Promise.reject("moveBy str value is not home or away")
                    }
                }
            }
        }
    },
    positionX: {
        in: ['body'],
        isEmpty: {
            negated: true,
            errorMessage: 'positionX is empty'
        },
        isInt: true,
        custom: {
            options: value => {
                if (value > 0 && value <= 500) {
                    return Promise.resolve()
                }
                else {
                    return Promise.reject("positionX not in range 0 - 500")
                }
            }
        }
    },
    positionY: {
        in: ['body'],
        isEmpty: {
            negated: true,
            errorMessage: 'positionY is empty'
        },
        isInt: true,
        custom: {
            options: value => {
                if (value > 0 && value <= 500) {
                    return Promise.resolve()
                }
                else {
                    return Promise.reject("positionX not in range 0 - 500")
                }
            }
        }
    }
})

module.exports = {
    newMoveRequestModelValidatorMiddleware
}