import { createSlice } from "@reduxjs/toolkit";
import { themeOptions } from "../constants/colors";
import {pageNames} from '../constants/routing'

const systemSlice = createSlice({
    name: 'system',
    initialState: {
        page: pageNames.HOME,
        theme: themeOptions.OCEANSEA,
        loadingModal: false,
        errorModalMessage: "",
        successModalMessage: ""
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
        },
        viewLoadingModal(state) {
            state.loadingModal = true;
            console.log("VIEW_LOADING_MODAL Called!")
        },
        hideLoadingModal(state) {
            state.loadingModal = false;
            console.log("HIDE_LOADING_MODAL Called!")
        },
        viewErrorModal(state, action) {
            const errorMessage = action.payload;
            state.errorModalMessage = errorMessage
            console.log("VIEW_ERROR_MODAL Called!")
        },
        hideErrorModal(state) {
            state.errorModalMessage = ""
            console.log("HIDE_ERROR_MODAL Called!")
        },
        viewSuccessModal(state, action) {
            const successMessage = action.payload
            state.successModalMessage = successMessage
            console.log("VIEW_SUCCESS_MODAL Called!")
        },
        hideSuccessModal(state) {
            state.successModalMessage = ""
            console.log("HIDE_SUCCESS_MODAL Called!")
        },
    }
})

export const { 
    setPage,
    viewErrorModal,
    hideErrorModal,
    viewSuccessModal,
    hideSuccessModal,
    viewLoadingModal,
    hideLoadingModal, 
    setTheme } = systemSlice.actions
export default systemSlice.reducer
