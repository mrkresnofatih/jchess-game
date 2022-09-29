import axios from "axios";
import { setGame } from "../redux/gameSlice";
import { store } from "../redux/store";
import { hideLoadingModal, viewErrorModal, viewLoadingModal, viewSuccessModal } from "../redux/systemSlice";

export const APIAddNewMove = (posX, posY) => {
    const {game} = store.getState()
    const apiUrl = 'http://localhost:5000/game/new-move'

    store.dispatch(viewLoadingModal())
    
    axios({
        method: 'post',
        url: apiUrl,
        data: {
            gameId: game.gameId,
            moveBy: Object.keys(game.moves).length % 2 === 0 ? "home" : "away",
            positionX: posX,
            positionY: posY
        }
    }).then((response) => {
        console.log(`API_CALL: ${apiUrl} | Data: ${JSON.stringify(response.data.data)}`)
        store.dispatch(setGame({
            gameId: response.data.data.gameId,
            moves: response.data.data.moves,
            winner: response.data.data.winner
        }));
        store.dispatch(hideLoadingModal())
        if (response.data.data.winner !== null) {
            store.dispatch(viewSuccessModal(response.data.data.winner + " WON!"))
        }
    }).catch((response) => {
        console.log(`API_FAIL: ${apiUrl} | Data: ${JSON.stringify(response.response.data)}`)
        store.dispatch(hideLoadingModal())
        store.dispatch(viewErrorModal(response.response.data.errorMessage))
    })
}