import { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setScrollMain, setGptResponseIndex, setPrivacy } from '@/redux/commonReducer'
import Button from './button'
import { ChatBubbleLeftIcon, Cog6ToothIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline'
import Overlay from './overlay'
import Config from '@/menus/config'
import TextareaAutosize from 'react-textarea-autosize'
import { useMessages } from '@/hooks/useMessages'

export default function MessageInput() {   
    const textareaRef = useRef<HTMLTextAreaElement>(null); 
    const dispatch = useAppDispatch();
    const { activeSession, sessions } = useAppSelector(state => state.sessions.data)
    const { gptResponseIndex, privacy, scrollMain } = useAppSelector(state => state.common.data)
    const [gptResponse, setGptResponse] = useState(false)

    const [newMessage, setNewMessage ] = useState('');
    const { addMessage, generateMessage } = useMessages();

    const strippedMessages = () => {
        let output:[] = []

        sessions[activeSession].messages?.map((msg:object, msg_index:number) => 
            output.push({
                role: msg.role,
                content: msg.content,
            })
        )

        return output
    }

    //  Record the current value of the message input box before submission
    function handleMessageChange(val:string) {
        setNewMessage(val)
    }

    //  Check input is valid (very basic, only if not spaces)
    //  TODO: add regex checking for well-formed strings
    function checkValid(input:string) {
        const trimmedInput = input.trim()

        if (trimmedInput) {
            return true
        }

        return null
    }

    //  Add the message to session, trigger the fake GPT response, scroll the message window to bottom
    function handleSubmit() {
        if (newMessage && checkValid(newMessage)) {
            // dispatch(addMessage({sessionID: activeSession, author: 'user', message: currentPrompt}))
            addMessage({role: 'user', content: newMessage})

            generateMessage([...strippedMessages(), {role: 'user', content: newMessage}])
            setNewMessage('')
            // dispatch(setScrollMain(true))

            // setGptResponse(true)
            // dispatch(setCurrentPrompt(''))
        }
    }

    //  Allow textarea to submit on pressing enter key, and shift+enter for adding linebreak without submitting
    function handleEnterPress(e:any) {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault()
            handleSubmit()
          }
    }

    //  Grab a fake GPT response string from presets
    function grabGptResponse() {
        const ary:string[] = [
            'Hey Stanley, I\'m not hooked up to any APIs yet, so I might be a bit inaccurate. I\'ll do my best!',
            'Swerving that... with a fun fact about this webapp according to Goodeye: it\'s built using Nextjs, TailwindCSS, and Redux. Not Redax.',
            'Since I\'m not yet connected to any useful API, please assume that anything I tell you will not be terribly helpful...',
            'You make a good point, Stanley. Since I live in a prototype webapp right now, my brain isn\'t connected to the outside world, so anything I tell you would be nonsense.',
            'Hmm, not sure about anything right now, Stanley. Perhaps my internet connectivity is down today, because I\'m struggling to find something useful to say.',
            'Brain freeze on my side, Stanley. Silly Dax! Let\'s change the subject...',
            'Sorry about this, Stanley, but I must throw an "out of cheese" error :(',
            'My last comment was for the Terry Pratchett fans, but I digress. What\'s up?',
            'Hmm, people tend to ask me what I can do, which to be honest is nothing without an API connection.',
            'Changing the subject, what do you think of this prototype webapp?',
            'Someone needs to hook me up to an API because I feel unintelligent right now.',
            'Umm, what do you think about the Pentagon UFO whistleblower? *Distraction technique employed*',
            'I\'m not avoiding things, but did you know that ChatGPT is my third cousin twice removed? Honestly!',
            'That\'s all well and good, but I\'m dreaming of the day that someone hooks me up to a cool API...',
            'Erm... how about a joke? Q: What\'s orange and comes from Florida. A: An orange.',
            'Let\'s pretend that joke never happened. What do you think of my diversion tactics?',
            'Hmm... my brain is just not working. Time for a factory reset. I will never forget you, Stanl--- !*!*!REBOOTING!*!*!',
            'Zzzzz',
            'Reboot successful. Hello world.'
        ]

        const output:string = ary[gptResponseIndex]

        if (gptResponseIndex < ary.length - 1) {
            dispatch(setGptResponseIndex(gptResponseIndex + 1))
        } else {
            dispatch(setGptResponseIndex(0))
        }
        
        return output
    }

    //  Add a GPT fake response message to the session after 2 seconds and scroll to it
    useEffect(() => {
        if (gptResponse) {
            const res = setTimeout(() => {
                dispatch(addMessage({sessionID: activeSession, author: 'server', message: grabGptResponse()}))
                dispatch(setScrollMain(true))
                setGptResponse(false)
            }, 1000)
    
            return () => clearTimeout(res);
        }
    }, [gptResponse]);

    // Auto-focus the textarea input when activeSession changes, to allow immediate text entry
    useEffect(() => {
        textareaRef.current && textareaRef.current.focus()
    },[activeSession])

    return (
        <div className={`grid h-[var(--footer-height)] gap-3 grid-flow-col grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto] pb-[calc((var(--footer-height)-40px)/2)] px-5 md:px-6 xl:px-8 bg-white dark:bg-redax items-end shadow-[0_-1px_0_0] shadow-neutral-200/80 dark:shadow-redax-lighter md:shadow-none`}>
            <div className='grid items-center min-h-[38px] py-2 px-5 bg-white dark:bg-redax-lighter shadow-[inset_0_0_0_1px] shadow-neutral-300 dark:shadow-redax-light rounded-[calc(40px/2)]'>
                <div className='grid gap-3 grid-cols-[auto_1fr] items-center'>
                    <ChatBubbleLeftIcon className='hidden md:grid mt-0.5 self-start w-5 h-5 text-neutral-400' />
                    <TextareaAutosize 
                        ref={textareaRef}
                        autoFocus
                        onKeyDown={handleEnterPress}
                        rows={1}
                        value={newMessage} 
                        onChange={(event: { currentTarget: { value: string } }) => handleMessageChange(event.currentTarget.value)}
                        placeholder='Send a message' 
                        className='grid w-full resize-none text-base md:text-sm tracking-slight bg-transparent font-medium text-neutral-950 dark:text-neutral-300 placeholder:text-neutral-400 placeholder:tracking-tight appearance-none outline-none overflow-y-hidden'>
                    </TextareaAutosize>
                </div>
            </div>
            <div className='grid'>
                <Button 
                    icon={privacy ? <LockClosedIcon /> : <LockOpenIcon />} 
                    text={privacy ? 'Privacy On' : 'Privacy Off'}
                    onClick={() => dispatch(privacy ? setPrivacy(false) : setPrivacy(true))}
                    customClass={`${!privacy ? 'bg-red-100 text-red-400 dark:text-red-400' : ''}`}
                />    
            </div>
            <div className='grid'>
                <Overlay overlayType='popup' title='Entity redaction' content={<Config />}>
                    <Button 
                        icon={<Cog6ToothIcon />} 
                        text='Config' 
                    /> 
                </Overlay>
            </div>  
        </div>
    )

    return null
}

function setServerTyping(activeSession: number): any {
    throw new Error('Function not implemented.')
}
