const { createNewGame, addNewMove } = require('../application/gameservice');
const { appLogger } = require('../utils/logging');
const { sendOkResponse } = require('../utils/serverhelper');

const gamecontroller = require('express').Router();

gamecontroller.get('/new-game', async (req, res, next) => {
    const newGameData = await createNewGame()
    sendOkResponse(res, newGameData);
})

gamecontroller.post('/new-move', async (req, res, next) => {
    console.log(req.body)
    const gameData = await addNewMove(req.body)
    sendOkResponse(res, gameData);
})

module.exports = {
    gamecontroller
}