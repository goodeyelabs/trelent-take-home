import { useEffect, useState, useRef } from 'react'
import { useAppSelector } from '@/redux/hooks'
import Button from './button'
import { BeakerIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import Overlay from './overlay'
import Config from '@/menus/config'
import TextareaAutosize from 'react-textarea-autosize'
import { useMessages } from '@/utils/useMessages'

export default function FloatingInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { activeSession, sessions } = useAppSelector(state => state.sessions.data)
  const [newMessage, setNewMessage] = useState('')
  const { addMessage, generateMessage } = useMessages()

  //  We need to strip out the timestamp from previous messages to match the format expected by ChatGPT. The endpoint call fails if any fields beyond role and content are sent
  
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
  //  TODO: this doesn't work so well on mobile devices with software keybords that auto-position to the textarea - maybe disable for mobile?

  useEffect(() => {
    textareaRef.current && textareaRef.current.focus()
  }, [activeSession])

  return (
    <div className='grid px-2.5 md:px-3 xl:px-4 lg:pb-[calc(var(--footer-height)/2)] bg-white dark:bg-redax'>
      <div className='grid py-0 pb-6 lg:pb-3 content-start w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-32 bg-white dark:bg-redax'>
        <div className='grid items-center py-2.5 px-4 md:px-3 xl:px-4 drop-shadow-sm bg-white dark:bg-redax-lighter shadow-[inset_0_0_0_1px] shadow-neutral-300 dark:shadow-neutral-700 rounded-[20px]'>
          <div className='grid gap-3 grid-flow-col grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] items-end'>
            <ChatBubbleLeftIcon className='hidden md:grid w-6 h-6 mb-[8px] text-mulberry-light' />
            <TextareaAutosize
              ref={textareaRef}
              autoFocus
              onKeyDown={handleEnterPress}
              rows={1}
              value={newMessage}
              onChange={(event: { currentTarget: { value: string } }) => handleMessageChange(event.currentTarget.value)}
              placeholder='Send a message'
              className='grid w-full resize-none pb-2 text-[16px] md:text-[17px] tracking-slight bg-transparent font-normal text-mulberry-dark dark:text-neutral-300 placeholder:text-neutral-400 placeholder: appearance-none outline-none overflow-y-hidden'>
            </TextareaAutosize>
            <Overlay overlayType='popup' title='ChatGPT configuration' content={<Config />}>
              <Button
                icon={<BeakerIcon />}
                text='Config'
              />
            </Overlay>
          </div>
        </div>
      </div>
    </div>
  )
}