import { createSlice } from "@reduxjs/toolkit";
import { themeOptions } from "../constants/colors";
import {pageNames} from '../constants/routing'

const systemSlice = createSlice({
    name: 'system',
    initialState: {
        page: pageNames.HOME,
        theme: themeOptions.OCEANSEA
    },
    reducers: {
        setPage(state, action) {
            const pageName = action.payload;
            state.page = pageName
            console.log("SET_PAGE Called!")
        },
        setTheme(state, action) {
            const themeName = action.payload;
            state.theme = themeName
            console.log("SET_THEME Called!")
        }
    }
})

export const { setPage, setTheme } = systemSlice.actions
export default systemSlice.reducer
