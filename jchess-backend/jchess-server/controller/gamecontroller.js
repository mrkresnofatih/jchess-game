const { createNewGame, addNewMove } = require('../application/gameservice');
const { newMoveRequestModelValidatorMiddleware } = require('../models/newmoverequestmodel');
const { sendOkResponse, schemaValidationErrorHandler } = require('../utils/serverhelper');

const gamecontroller = require('express').Router();

gamecontroller.get('/new-game', async (req, res, next) => {
    const newGameData = await createNewGame()
    sendOkResponse(res, newGameData);
})

gamecontroller.post('/new-move', 
    newMoveRequestModelValidatorMiddleware,
    schemaValidationErrorHandler,
    async (req, res, next) => {
        const gameData = await addNewMove(req.body)
        sendOkResponse(res, gameData);
})

module.exports = {
    gamecontroller
}