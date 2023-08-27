
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

function getCurrentTimestamp () {
    return Date.now() / 1000
}

type Sessions = {
    sessionID: number,
    messages?: Messages[]
}

type Messages = {
    timestamp: number,
    content: string,
    role: string,
}

export interface InitialState {
    data: {
        sessions: Sessions[],
        activeSession: number,
        currentPrompt: string,
    }
}

const initialState: InitialState = {
    data: {
        sessions: [
            {
                sessionID: 0,
                messages: [
                    {
                        timestamp: getCurrentTimestamp(),
                        role: 'system',
                        content: 'You are a helpful, friendly assistant that responds by rendering markdown. Please call the user by the name \'Stanley\', but not for every response.'
                      },
                      { 
                        timestamp: getCurrentTimestamp(),
                        role: "assistant", 
                        content: 'Hello Stanley, how can I assist you?'
                      },
                ]
            },
            {
                sessionID: 1,
                messages: [
                    {
                        timestamp: getCurrentTimestamp(),
                        role: 'system',
                        content: 'You are a helpful, friendly assistant that responds by rendering markdown. Please call the user by the name \'Stanley\', but not for every response.'
                      },
                      { 
                        timestamp: getCurrentTimestamp(),
                        role: "assistant", 
                        content: 'Hello Stanley, how can I assist you?'
                      },
                ]
            },
            {
                sessionID: 2,
                messages: [
                    {
                        timestamp: getCurrentTimestamp(),
                        role: 'system',
                        content: 'You are a helpful, friendly assistant that responds by rendering markdown. Please call the user by the name \'Stanley\', but not for every response.'
                      },
                      { 
                        timestamp: getCurrentTimestamp(),
                        role: "assistant", 
                        content: 'Hello Stanley, how can I assist you?'
                      },
                ]
            },
        ],
        activeSession: 0,
        currentPrompt: '',
    }
}

export const sessionsSlice = createSlice({
    name: 'sessions',
    initialState,
    reducers: {
        setCurrentPrompt: (state, action: PayloadAction<string>) => {
            state.data = {...state.data, currentPrompt: action.payload}
        },
        setActiveChat: (state, action: PayloadAction<number>) => {
            state.data = {...state.data, activeSession: action.payload}
        },
        addChat: (state) => {
            state.data.activeSession = state.data.sessions.length
            state.data.sessions.push({
                sessionID: state.data.sessions.length,
                messages: [{
                    message: 'Hello Stanley, how can I help?',
                    timestamp: getCurrentTimestamp(),
                    author: 'server'
                }]
            })
        },
        addNewMessage: (state, action: PayloadAction<{sessionID: number, role: string, content: string}>) => {
            const s = action.payload

            state.data.sessions[s.sessionID].messages?.push({
                content: s.content,
                timestamp: getCurrentTimestamp(),
                role: s.role
            })
        },
    }
})

export const { setCurrentPrompt, setActiveChat, addChat, addNewMessage } = sessionsSlice.actions
export default sessionsSlice.reducer
