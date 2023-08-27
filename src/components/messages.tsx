import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { formatDate, orderSessionsByCreateDate, getSessionMessages } from '@/tools/utils'
import { setActiveChat } from '@/redux/sessionsReducer'
import { useEffect, useRef, useState } from 'react'
import { setScrollMain } from '@/redux/commonReducer'

export default function Messages() {
    const { activeSession, sessions } = useAppSelector(state => state.sessions.data)
    const { scrollMain } = useAppSelector(state => state.common.data)
    const [mounted, setMounted] = useState(false)
    const mainRef = useRef<HTMLDivElement>(null); 
    const dispatch = useAppDispatch();

    const list:any = sessions
    const messages = list[activeSession].messages

    useEffect(() => {
        dispatch(setScrollMain(true))
        setMounted(true)
    },[])

    useEffect(() => {
        if (scrollMain && mounted) {
            mainRef?.current?.scrollIntoView()
            dispatch(setScrollMain(false))
        }
    },[mounted,scrollMain])

    if (mounted && list[activeSession]) {
        return (
            <div className='grid py-0 pb-6 lg:pb-3 items-start content-start w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-32 bg-white dark:bg-redax'>
                {
                    messages.map((m:object, m_idx:number) => {
                        const msg:any = m

                        //  TODO: make this bit DRY
                        //  GPT response bubble
                        if (msg.author === 'server') {
                            return (
                                <div 
                                    key={m_idx} 
                                    className='grid px-2.5 md:px-3 xl:px-4 animate-pop-up-from-bottom'
                                    >
                                    <div className='grid gap-2 w-[90%] place-self-start justify-start justify-items-start py-4'>
                                        <div className='grid bg-neutral-100/50 dark:bg-redax-light rounded-[10px] px-2.5 md:px-3 xl:px-4'>
                                            <p className='text-sm font-base tracking-slight leading-relaxed text-gray-950 dark:text-stone-300 py-2'>
                                                {msg.message || 'New message'}
                                            </p>
                                        </div>
                                        <p className='text-xs text-neutral-400/80 dark:text-neutral-500/70 tracking-normal'><span className='font-base'>RedaxGPT</span> &middot; {mounted ? formatDate(msg.timestamp.toString()) : 'Loading'}</p>
                                    </div>
                                </div>
                            )
                        }

                        //  User response bubble
                        return (
                            <div 
                                key={m_idx} 
                                className='grid px-2.5 md:px-3 xl:px-4 animate-pop-up-from-bottom'
                            >
                                <div className='grid gap-2 w-[90%] place-self-end justify-end justify-items-end py-4'>
                                    <div className='grid bg-gradient-to-r from-blue-500 to-sky-400 rounded-[10px] px-2.5 md:px-3 xl:px-4'>
                                        <p className='text-sm font-base tracking-slight leading-relaxed text-white py-2'>
                                            {msg.message || 'New message'}
                                        </p>
                                    </div>
                                    <p className='text-xs text-neutral-400/80 dark:text-neutral-500/70 tracking-normal'><span className='font-base'>Stanley</span> &middot; {mounted ? formatDate(msg.timestamp.toString()) : 'Loading'}</p>
                                </div>
                            </div>
                        )
                    })    
                }
                {/* Next div is needed for scrollMain to work */}
                <div ref={mainRef}></div>
            </div>
        )
    }
    
    return null
}