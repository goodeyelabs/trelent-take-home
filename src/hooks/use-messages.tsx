import { MessageType } from '@/types'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface ContextProps {
  messages: MessageType[]
  addMessage: any
  generateMessage: any
  generatedMessage: string
  isPreparingAnswer: boolean
  isGeneratingAnswer: boolean
}

const initialMessages: MessageType[] = [
  {
    role: 'system',
    content: 'You are a helpful, friendly assistant that responds by rendering markdown. Please call the user by the name \'Stanley\', but not for every response.'
  },
  { 
    role: "assistant", 
    content: 'Hello Stanley, how can I assist you?'
  },
];

const MessagesContext = createContext<Partial<ContextProps>>({})

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState(initialMessages)
  const [isPreparingAnswer, setIsPreparingAnswer] = useState(false)
  const [isGeneratingAnswer, setisGeneratingAnswerAnswer] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState<string>("");

  const addMessage = (message:MessageType) => {
    setMessages([...messages, message])
  }

  const generateMessage = async (messageList:MessageType[]) => {
    setGeneratedMessage("");
    setIsPreparingAnswer(true);

    const response = await fetch("/api/createStream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageList }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    setisGeneratingAnswerAnswer(true)

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      
      setGeneratedMessage((prev) => prev + chunkValue);
    }

    setisGeneratingAnswerAnswer(false)
    setIsPreparingAnswer(false);
  };

  useEffect(() => {
    if (generatedMessage && !isGeneratingAnswer) {
      setMessages([
        ...messages,
        {
          role: 'assistant',
          content: generatedMessage
        }
      ])
      setGeneratedMessage('')
    }
  },[generatedMessage, isGeneratingAnswer])

  return (
    <MessagesContext.Provider value={{ messages, isPreparingAnswer, isGeneratingAnswer, addMessage, generateMessage, generatedMessage }}>
      {children}
    </MessagesContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(MessagesContext) as ContextProps
}
