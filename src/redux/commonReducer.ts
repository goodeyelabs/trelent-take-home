
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// 
// Helper states/utilities
//

export interface InitialState {
    data: {
        scrollMain: boolean,
        auth: boolean,
        gptResponseIndex: number,
        privacy: boolean,
        searchTerm: string,
    }
}

const initialState: InitialState = {
    data: {
        scrollMain: false,
        auth: true,
        gptResponseIndex: 0,
        privacy: true,
        searchTerm: "",
    }
}

export const sessionsSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setScrollMain: (state, action: PayloadAction<boolean>) => {
            state.data = {...state.data, scrollMain: action.payload}
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.data = {...state.data, auth: action.payload}
        },
        setGptResponseIndex: (state, action: PayloadAction<number>) => {
            state.data = {...state.data, gptResponseIndex: action.payload}
        },
        setPrivacy: (state, action: PayloadAction<boolean>) => {
            state.data = {...state.data, privacy: action.payload}
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.data = {...state.data, searchTerm: action.payload}
        },
    }
})

export const { setScrollMain, setAuth, setGptResponseIndex, setPrivacy, setSearchTerm } = sessionsSlice.actions
export default sessionsSlice.reducer
