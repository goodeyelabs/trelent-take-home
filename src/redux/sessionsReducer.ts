
//  ======
//  Message redux init, initial demo data, message CRUD functions
//  ======

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

function getCurrentTimestamp() {
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
            content: "Help me paint the Barbarian miniature from the HeroQuest game system, using a simplified set of steps.",
          },
          {
            timestamp: getCurrentTimestamp(),
            role: "assistant",
            content: "Certainly, Stanley! Here's a guide to painting the Barbarian miniature in just a few steps:\n\n**Prepare & prime** Start by priming the miniature with a thin, even coat of primer. This will help the paint adhere better.\n\n**Base colors & highlights** Use base colors to paint the different areas of the miniature. For the Barbarian, you can use brown for the leather armor, silver for the weapon, and various colors for the details like the belt, boots, and hair.\n\n**Finishing touches** Complete the miniature by adding additional details like a wash or dry brush technique to enhance texture and depth. You can also add small accents, like freehand designs or decals, to personalize the miniature.",
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
            content: "Yes, Stanley, I can help with this. Tell me what you would like to achieve tomorrow and I will create some useful todo items to help you get there."

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
      state.data = { ...state.data, currentPrompt: action.payload }
    },
    setActiveChat: (state, action: PayloadAction<number>) => {
      state.data = { ...state.data, activeSession: action.payload }
    },
    addChat: (state) => {
      state.data.activeSession = state.data.sessions.length
      state.data.sessions.push({
        sessionID: state.data.sessions.length,
        messages: boilerplateMessages,
      })
    },
    addNewMessage: (state, action: PayloadAction<{ sessionID: number, role: string, content: string }>) => {
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
