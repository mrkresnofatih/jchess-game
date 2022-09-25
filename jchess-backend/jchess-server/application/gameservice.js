const shortid = require('shortid');
const { buildBadMethodResponse, buildOkMethodResponse } = require('../utils/apphelper');
const { appLogger } = require('../utils/logging');
const { getRedisClient } = require('./redis');

const createNewGame = async () => {
    const redisClient = await getRedisClient();
    const newGameId = shortid.generate()
    const newGameData = {
        gameId: newGameId,
        moves: {},
        winner: null,
        topY: 1000,
        leftX: 1000,
        rightX: 0,
        bottomY: 0
    }
    const newGameIdRedisKey = `gamedata-${newGameId}`
    await redisClient.set(newGameIdRedisKey, JSON.stringify(newGameData))
    return newGameData;
}

const addNewMove = async (newMoveData) => {
    const redisClient = await getRedisClient();
    appLogger.info("new-move-data received!")
    const gameDataKey = `gamedata-${newMoveData.gameId}`
    const gameDataRaw = await redisClient.get(gameDataKey);
    const gameData = JSON.parse(gameDataRaw)
    if (gameData.winner !== null) {
        appLogger.error("game already over! no more moves to make!");
        return buildBadMethodResponse("game already over")
    }
    const newMoveCoordinateKey = constructCoordinatesKey(newMoveData.positionX, newMoveData.positionY);
    if (gameData.moves[newMoveCoordinateKey] !== undefined) {
        appLogger.error("position taken!");
        return buildBadMethodResponse("position taken")
    }
    if (Object.keys(gameData.moves).length % 2 === 0 && newMoveData.moveBy !== "home") {
        appLogger.error("wrong turn! turn is even number but move-author is not home!");
        return buildBadMethodResponse("wrong turn")
    } else if (Object.keys(gameData.moves).length % 2 === 1 && newMoveData.moveBy !== "away") {
        appLogger.error("wrong turn! turn is odd number but move-author is not away!")
        return buildBadMethodResponse("wrong turn")
    }
    var data = {}
    Object.keys(gameData.moves).forEach(key => {
        data[key] = gameData.moves[key]
    })
    data[newMoveCoordinateKey] = {
        "moveBy": newMoveData.moveBy,
        "positionX": newMoveData.positionX,
        "positionY": newMoveData.positionY,
        "recordedAt": Date.now()
    }
    const newGameDataDraft = {
        gameId: gameData.gameId,
        moves: data,
        winner: null,
        topY: (newMoveData.positionY < gameData.topY) ? newMoveData.positionY : gameData.topY,
        leftX: (newMoveData.positionX < gameData.leftX) ? newMoveData.positionX : gameData.leftX,
        rightX: (newMoveData.positionX > gameData.rightX) ? newMoveData.positionX : gameData.rightX,
        bottomY: (newMoveData.positionY > gameData.bottomY) ? newMoveData.positionY : gameData.bottomY
    }
    const calculatedNewGameDataDraft = calculateWinner(newGameDataDraft, newMoveData)
    await redisClient.set(gameDataKey, JSON.stringify(calculatedNewGameDataDraft))
    return buildOkMethodResponse(calculatedNewGameDataDraft);
}

const calculateWinner = (newGameDataDraft, newMoveData) => {
    if (Object.keys(newGameDataDraft.moves).length < 9) {
        return {
            ...newGameDataDraft,
            winner: null
        }
    } else {
        // calculate vertical
        appLogger.info("calculating vertical")
        let count = 0
        for(var y = newGameDataDraft.topY; y <= newGameDataDraft.bottomY; y++) {
            const key = constructCoordinatesKey(newMoveData.positionX, y)
            if (newGameDataDraft.moves[key] === undefined) {
                count = 0
            } else {
                if(newGameDataDraft.moves[key].moveBy === newMoveData.moveBy) {
                    count++
                } else {
                    count = 0
                }
            }
        }

        if (count >= 5) {
            return {
                ...newGameDataDraft,
                winner: newMoveData.moveBy
            }
        }

        // calculate horizontal
        appLogger.info("calculating horizontal")
        count = 0
        for(var x = newGameDataDraft.leftX; x <= newGameDataDraft.rightX; x++) {
            const key = constructCoordinatesKey(x, newMoveData.positionY)
            if (newGameDataDraft.moves[key] === undefined) {
                count = 0
            } else {
                if(newGameDataDraft.moves[key].moveBy === newMoveData.moveBy) {
                    count++
                } else {
                    count = 0
                }
            }
        }

        if (count >= 5) {
            return {
                ...newGameDataDraft,
                winner: newMoveData.moveBy
            }
        }

        // calculate downwards diagonal
        appLogger.info("calculating downwards diagonal")
        count = 0
        for(var x = newGameDataDraft.leftX; x <= newGameDataDraft.rightX; x++) {
            const key = constructCoordinatesKey(x, newMoveData.positionY - (newMoveData.positionX - newGameDataDraft.leftX) + (x - newGameDataDraft.leftX))
            if (newGameDataDraft.moves[key] === undefined) {
                count = 0
            } else {
                if(newGameDataDraft.moves[key].moveBy === newMoveData.moveBy) {
                    count++
                } else {
                    count = 0
                }
            }
        }

        if (count >= 5) {
            return {
                ...newGameDataDraft,
                winner: newMoveData.moveBy
            }
        }

        // calculate upwards diagonal
        appLogger.info("calculating upwards diagonal")
        count = 0
        for(var x = newGameDataDraft.leftX; x <= newGameDataDraft.rightX; x++) {
            const key = constructCoordinatesKey(x, newMoveData.positionY + (newMoveData.positionX - newGameDataDraft.leftX) - (x - newGameDataDraft.leftX))
            if (newGameDataDraft.moves[key] === undefined) {
                count = 0
            } else {
                if(newGameDataDraft.moves[key].moveBy === newMoveData.moveBy) {
                    count++
                } else {
                    count = 0
                }
            }
        }

        if (count >= 5) {
            return {
                ...newGameDataDraft,
                winner: newMoveData.moveBy
            }
        }

        appLogger.info("no winners yet")
        return {
            ...newGameDataDraft,
            winner: null
        }

    }
}

const constructCoordinatesKey = (posX, posY) => {
    return `${posX}-${posY}`;
}

module.exports = {
    createNewGame,
    addNewMove
}