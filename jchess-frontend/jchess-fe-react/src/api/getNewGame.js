import axios from 'axios'
import { setGame } from '../redux/gameSlice'
import {store} from '../redux/store'

export const APIGetNewGame = (callback) => {
    const apiUrl = 'http://localhost:5000/game/new-game'
    axios({
        method: 'get',
        url: apiUrl
    }).then((response) => {
        console.log(`API_CALL: ${apiUrl} | Data: ${JSON.stringify(response.data.data)}`)
        store.dispatch(setGame({
            gameId: response.data.data.gameId,
            moves: response.data.data.moves,
            winner: response.data.data.winner
        }));
        callback();
    }).catch((response) => {
        console.log(`API_FAIL: ${apiUrl} | Data: ${JSON.stringify(response.response.data)}`)
    })
}