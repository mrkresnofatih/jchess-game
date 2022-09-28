import { configureStore } from "@reduxjs/toolkit";
import systemReducer from './systemSlice'
import gameReducer from './gameSlice'


export const store = configureStore({
    reducer: {
        system: systemReducer,
        game: gameReducer
    }
})