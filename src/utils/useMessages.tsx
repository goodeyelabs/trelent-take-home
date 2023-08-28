
//  ======
//  Creates a hook for any component to grab chat message actions, such as creating new messages within the active chat session
//  ======

import { MessageType } from '@/types'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { addNewMessage } from '@/redux/sessionsReducer'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

interface ContextProps {
  messages: MessageType[]
  addMessage: any
  generateMessage: any
  generatedMessage: string
  isPreparingAnswer: boolean
  isGeneratingAnswer: boolean
}

const MessagesContext = createContext<Partial<ContextProps>>({})

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [isPreparingAnswer, setIsPreparingAnswer] = useState(false)
  const [isGeneratingAnswer, setisGeneratingAnswerAnswer] = useState(false)
  const [generatedMessage, setGeneratedMessage] = useState<string>("")
  const { activeSession } = useAppSelector(state => state.sessions.data)
  const dispatch = useAppDispatch()

  //  Create a new message entry in a session's redux node

  const addMessage = (message: MessageType) => {
    dispatch(addNewMessage({ sessionID: activeSession, content: message.content, role: message.role }))
  }

  // Build body parameter to send to internal api route (/createStream) for posting afterwards to OpenAI

  const generateMessage = async (messageList: MessageType[]) => {
    setGeneratedMessage("")
    setIsPreparingAnswer(true)

    const response = await fetch("/api/createStream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageList }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    // Since OpenAI returns a streamed response, we access via EventSource and pull a 'live' feed of text response entities

    const data = response.body
    if (!data) {
      return
    }

    // We need to decode the stream from UTF-8 to more useful text

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false
    setisGeneratingAnswerAnswer(true)

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)

      setGeneratedMessage((prev) => prev + chunkValue)
    }

    setisGeneratingAnswerAnswer(false)
    setIsPreparingAnswer(false)
  }

  //  Once a complete text response is ready, we add it to redux, and reset

  useEffect(() => {
    if (generatedMessage && !isGeneratingAnswer) {
      dispatch(addNewMessage({ sessionID: activeSession, content: generatedMessage, role: 'assistant' }))
      setGeneratedMessage('')
    }
  }, [generatedMessage, isGeneratingAnswer, dispatch, activeSession])

  return (
    <MessagesContext.Provider value={{ isPreparingAnswer, isGeneratingAnswer, addMessage, generateMessage, generatedMessage }}>
      {children}
    </MessagesContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(MessagesContext) as ContextProps
}
