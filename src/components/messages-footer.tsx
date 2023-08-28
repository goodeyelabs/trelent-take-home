//  ======
//  Message creation component
//  ======

import { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Button from './button'
import { ChatBubbleLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import Overlay from './overlay'
import Config from '@/menus/config'
import TextareaAutosize from 'react-textarea-autosize'
import { useMessages } from '@/utils/useMessages'

export default function MessageInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useAppDispatch()
  const { activeSession, sessions } = useAppSelector(state => state.sessions.data)
  const { gptResponseIndex, privacy, scrollMain } = useAppSelector(state => state.common.data)
  const [gptResponse, setGptResponse] = useState(false)

  const [newMessage, setNewMessage] = useState('')
  const { addMessage, generateMessage } = useMessages()

  const strippedMessages = () => {
    let output: any[] = []

    sessions[activeSession].messages?.map((msg: any, msg_index: number) =>
      output.push({
        role: msg.role,
        content: msg.content,
      })
    )

    return output
  }

  //  Record the current value of the message input box before submission

  function handleMessageChange(val: string) {
    setNewMessage(val)
  }

  //  Check input is valid (very basic, only if not spaces)
  //  TODO: add regex checking for well-formed strings

  function checkValid(input: string) {
    const trimmedInput = input.trim()

    if (trimmedInput) {
      return true
    }

    return null
  }

  //  Add the message to session, trigger the fake GPT response, scroll the message window to bottom

  function handleSubmit() {
    if (newMessage && checkValid(newMessage)) {
      addMessage({ role: 'user', content: newMessage })
      generateMessage([...strippedMessages(), { role: 'user', content: newMessage }])
      setNewMessage('')
    }
  }

  //  Allow textarea to submit on pressing enter key, and shift+enter for adding linebreak without submitting

  function handleEnterPress(e: any) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Auto-focus the textarea input when activeSession changes, to allow immediate text entry

  useEffect(() => {
    textareaRef.current && textareaRef.current.focus()
  }, [activeSession])

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
      {/* <div className='grid'>
          <Button 
              icon={privacy ? <LockClosedIcon /> : <LockOpenIcon />} 
              text={privacy ? 'Privacy On' : 'Privacy Off'}
              onClick={() => dispatch(privacy ? setPrivacy(false) : setPrivacy(true))}
              customClass={`${!privacy ? 'bg-red-100 text-red-400 dark:text-red-400' : ''}`}
          />    
        </div> */}
      <div className='grid'>
        <Overlay overlayType='popup' title='ChatGPT configuration' content={<Config />}>
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
