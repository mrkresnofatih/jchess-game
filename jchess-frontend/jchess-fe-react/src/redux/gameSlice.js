import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        gameId: null,
        moves: {},
        winner: null
    },
    reducers: {
        setGame(state, action) {
            const {gameId, moves, winner} = action.payload;
            state.gameId = gameId;
            state.moves = moves;
            state.winner = winner;
            console.log("INIT_NEW_GAME Called!")
        }
    }
})

export const { setGame } = gameSlice.actions;
export default gameSlice.reducer;