import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { formatDate, orderSessionsByCreateDate, getSessionMessages } from '@/tools/utils'
import { useEffect, useRef, useState } from 'react'
import { setScrollMain } from '@/redux/commonReducer'
import { useMessages } from '@/hooks/useMessages'
import { Message } from './message'

export default function MessageList() {
    const { activeSession, sessions } = useAppSelector(state => state.sessions.data)
    const { scrollMain } = useAppSelector(state => state.common.data)
    const mainRef = useRef<HTMLDivElement>(null); 
    const dispatch = useAppDispatch();
    const list:any = sessions
    const messages = list[activeSession].messages
    const { generatedMessage } = useMessages();
    const [recentGeneratedResponse, setRecentGeneratedResponse] = useState('')

    useEffect(() => {
        dispatch(setScrollMain(true))
    },[messages, generatedMessage, dispatch])

    useEffect(() => {
        if (scrollMain) {
            mainRef?.current?.scrollIntoView()
            dispatch(setScrollMain(false))
        }
    },[scrollMain, dispatch])

    if (list[activeSession]) {
        return (
            <div className='grid py-0 pb-6 lg:pb-3 items-start content-start w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-32 bg-white dark:bg-redax'>
                {
                    messages.map((m:any, m_idx:number) => {
                        if (m.role === 'assistant' && m.content !== generatedMessage) {
                            return (
                                <div key={m_idx}>
                                    <Message timestamp={m.timestamp} keyProp={m_idx} content={m.content} role={'assistant'} />
                                </div>
                            )
                        }
                        if (m.role === 'user') {
                            return (
                                <div key={m_idx}>   
                                    <Message timestamp={m.timestamp} keyProp={m_idx} content={m.content} role={'user'} />
                                </div>
                            )
                        }
                        return null
                    })    
                }
                {
                    generatedMessage &&
                        <Message content={generatedMessage} role={'assistant'} typewriter={'ChatGPT is typing'} />
                }
                {/* Next div is needed for scrollMain to work */}
                <div ref={mainRef}></div>
            </div>
        )
    }
    
    return null
}