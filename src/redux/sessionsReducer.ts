
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
    message: string,
    author: string,
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
                        timestamp: 1692004198,
                        message: "Hello Stanley, how can I help?",
                        author: 'server',
                    },
                    {
                        timestamp: 1692004200,
                        message: "Can you help me update my personal information with my mortgage provider, Wells Fargo?",
                        author: 'user',
                    },
                    {
                        timestamp: 1692004258,
                        message: "That is all for today, thanks.",
                        author: 'user',
                    },
                    {
                        timestamp: 1692004250,
                        message: "I\'ve sent you a weblink to your email to help you change your [redacted] details instantly. Anything else I can help with?",
                        author: 'server',
                    },
                    {
                        timestamp: 1692004258,
                        message: "That is all for today, thanks.",
                        author: 'user',
                    }
                ]
            },
            {
                sessionID: 1,
                messages: [

                    {
                        timestamp: 1692083998,
                        message: "Hello Stanley, how can I help?",
                        author: 'server',
                    },
                    {
                        timestamp: 1692084000,
                        message: "Can you help me write a job application for the open role of dentist at the firm Toothy McToothy & Sons?",
                        author: 'user',
                    },
                    {
                        timestamp: 1692084002,
                        message: "[Redacted] is a great firm, let\'s get your resumé up to scratch for the role of [redacted].",
                        author: 'server',
                    },
                    {
                        timestamp: 1692084004,
                        message: "Do you have all your examination certificates to hand?",
                        author: 'server',
                    },
                    {
                        timestamp: 1692084030,
                        message: "Actually, I\'ll come back tomorrow.",
                        author: 'user',
                    }
                ]
            },
            {
                sessionID: 2,
                messages: [
                    {
                        timestamp: 1692200878,
                        message: "Hello Stanley, how can I help?",
                        author: 'server',
                    },
                    {
                        timestamp: 1692200880,
                        message: "How do I cash a check when my bank account is entirely virtual? I don't have a branch to visit.",
                        author: 'user',
                    },
                    {
                        timestamp: 1692200881,
                        message: "It\'s Royal Bank of Canada.",
                        author: 'user',
                    },
                    {
                        timestamp: 1692200883,
                        message: "I will help you with cashing a check at [redacted]. Oftentimes virtual banks make arrangements with local grocery stores and retailers to allow customers to scan their checks securely at a terminal on the premises. This means the money is available in your account immediately.",
                        author: 'server',
                    },
                    {
                        timestamp: 1692200890,
                        message: "Does that help, or do you want more options?",
                        author: 'server',
                    },
                    {
                        timestamp: 1692200898,
                        message: "I don\'t live close to any shops, what else could I do?",
                        author: 'user',
                    },
                    {
                        timestamp: 1692200890,
                        message: "Many banks, including [redacted] have sophisticated mobile apps that allow customers to transact digitally. If you install [redacted]\'s mobile app for iPhone or Android, you will be able to scan your check using the phone\'s camera and securely add the funds to your account.",
                        author: 'server',
                    },
                    {
                        timestamp: 1692200898,
                        message: "That\'s perfect, I will do that. My sister-in-law Emily should be able to help me.",
                        author: 'user',
                    },
                    {
                        timestamp: 1692200900,
                        message: "Great news, I hope that [redacted] is able to help you if you get stuck. Good luck!",
                        author: 'server',
                    },
                ]
            }

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
                messages: [{
                    message: 'Hello Stanley, how can I help?',
                    timestamp: getCurrentTimestamp(),
                    author: 'server'
                }]
            })
        },
        addMessage: (state, action: PayloadAction<{sessionID: number, author: string, message: string}>) => {
            const s = action.payload

            state.data.sessions[s.sessionID].messages?.push({
                message: s.message,
                timestamp: getCurrentTimestamp(),
                author: s.author
            })
        },
    }
})

export const { setCurrentPrompt, setActiveChat, addChat, addMessage } = sessionsSlice.actions
export default sessionsSlice.reducer
