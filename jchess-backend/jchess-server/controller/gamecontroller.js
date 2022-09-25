const { createNewGame, addNewMove } = require('../application/gameservice');
const { newMoveRequestModelValidatorMiddleware } = require('../models/newmoverequestmodel');
const { sendOkResponse, schemaValidationErrorHandler, sendBadResponse } = require('../utils/serverhelper');

const gamecontroller = require('express').Router();

gamecontroller.get('/new-game', async (req, res, next) => {
    const newGameData = await createNewGame()
    sendOkResponse(res, newGameData);
})

gamecontroller.post('/new-move', 
    newMoveRequestModelValidatorMiddleware,
    schemaValidationErrorHandler,
    async (req, res, next) => {
        const addNewMoveResponse = await addNewMove(req.body)
        if (addNewMoveResponse.error !== null) {
            sendBadResponse(res, addNewMoveResponse.error)
        } else {
            sendOkResponse(res, addNewMoveResponse.data);
        }
})

module.exports = {
    gamecontroller
}