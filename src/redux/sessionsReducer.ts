
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

//
// Define demo data, default initial data, and various message CRUD actions
//

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

const boilerplateMessages = [
    {
        timestamp: getCurrentTimestamp(),
        role: 'system',
        content: 'You are a helpful assistant that always responds using markdown. Please call the user by the name \'Stanley\', but not for every response.'
    },
    { 
        timestamp: getCurrentTimestamp(),
        role: "assistant", 
        content: 'Hello Stanley, how can I assist you?'
    },
]

const initialState: InitialState = {
    data: {
        sessions: [
            {
                sessionID: 0,
                messages: [
                    ...boilerplateMessages,
                    {
                        timestamp: getCurrentTimestamp(),
                        role: "user",
                        content: "What does it mean that Saturn is in opposition right now? Is Saturn in danger of hitting the Earth?",
                    },
                    {
                        timestamp: getCurrentTimestamp(),
                        role: "assistant",
                        content: "When we say that Saturn is in opposition, it means that Saturn and the Sun are on opposite sides of the Earth. This alignment allows for optimal viewing conditions, as Saturn is visible throughout the night, rising in the east as the Sun sets in the west. However, it's important to note that the opposition of Saturn does not have any impact on its distance from Earth or pose any danger of collision. Saturn is located approximately 1.2 billion kilometers away from Earth, and its orbit is well-defined, keeping it at a safe distance. So, there is no need to worry about Saturn hitting the Earth during its opposition or at any other time.",
                    },
                ]
            },

            {
                sessionID: 1,
                messages: [
                    ...boilerplateMessages,
                    {
                        timestamp: getCurrentTimestamp(),
                        role: "user",
                        content: "Can you help me build a list of todo items I should do tomorrow?",
                    },
                    {
                        timestamp: getCurrentTimestamp(),
                        role: "assistant",
                        content: "Yes, Stanley, I can help with this. Tell my what you would like to achieve tomorrow and I will create some useful todo items to help you get there."
                        
                    },
                ]
            },
            {
                sessionID: 2,
                messages: [
                    ...boilerplateMessages,
                    {
                        timestamp: getCurrentTimestamp(),
                        role: "user",
                        content: "Can you show me a table of the 3 most populous provinces in Canada?",
                    },
                    {
                        timestamp: getCurrentTimestamp(),
                        role: "assistant",
                        content: "Certainly! Here's a table of the 3 most populous provinces in Canada as of my last update in 2021:\n\n| Province         | Population   |\n|------------------|--------------|\n| Ontario          | ~14.7 million|\n| Quebec           | ~8.5 million |\n| British Columbia | ~5.1 million |",
                    },
                ]
            },
        ],
        activeSession: 2,
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
                messages: boilerplateMessages,
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
