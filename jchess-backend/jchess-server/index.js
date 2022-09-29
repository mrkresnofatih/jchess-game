const express = require('express');
const { gamecontroller } = require('./controller/gamecontroller');
const cors = require('cors')
const { appLogger } = require('./utils/logging');
const app = express();
const bodyParser = require('body-parser')
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(bodyParser.json())
app.use("/game", gamecontroller);

app.listen(port, () => {
    appLogger.info(`Listening on port ${port}`)
})
