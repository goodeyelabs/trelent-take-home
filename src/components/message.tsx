//  ======
//  Individual message bubble, with different renders for user/assistant
//  ======

import { formatDate } from '@/tools/common'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export type MessageProps = {
  keyProp?: number,
  role: string,
  content: string,
  timestamp?: number,
  typewriter?: string,
}

export function Message({ keyProp, role, content, timestamp, typewriter }: MessageProps) {
  let bubbleWrap = 'grid px-2.5 md:px-3 xl:px-4'
  let bubbleOuter = 'grid gap-2 w-[90%] place-self-start justify-start justify-items-start py-4'
  let bubble = 'grid items-center bg-mulberry-lighter/40 dark:bg-redax-light rounded-[20px] px-4 md:px-4 xl:px-4'
  let bubbleText = 'text-[15px] font-base text-mulberry dark:text-stone-300 py-[9px]'

  if (role === 'user') {
    bubbleWrap = 'grid px-2.5 md:px-3 xl:px-4 animate-pop-up-from-bottom'
    bubbleOuter = 'grid gap-2 w-[90%] place-self-end justify-end justify-items-end py-4'
    bubble = 'grid items-center bg-gradient-to-r from-blue-500 to-sky-400 rounded-[20px] px-4 md:px-4 xl:px-4'
    bubbleText = 'text-[15px] font-base text-white py-[9px]'
  }

  if (typewriter) {
    bubbleWrap = 'grid px-2.5 md:px-3 xl:px-4 animate-pop-up-from-bottom'
  }

  return (
    <div
      key={keyProp}
      className={bubbleWrap}
    >
      <div className={bubbleOuter}>
        <div className={bubble}>
          <div className={bubbleText}>
            {
              content === '...' &&
              <EllipsisHorizontalIcon className='w-3.5 animate-ping'/>
            }
            {
              content !== '...' &&
                <>
                  {// eslint-disable-next-line
                    <ReactMarkdown className='react-markdown' children={content ? content : ''} remarkPlugins={[remarkGfm]} />
                  }
                </>
            }
          </div>
        </div>
        <p className={`text-xs text-mulberry-light dark:text-neutral-500/70 ${role === 'assistant' && 'pl-4 md:pl-4 xl:pl-4'}`}>
          {
            typewriter &&
            <span className='font-base'>{typewriter}</span>
          }
          {
            !typewriter &&
            <>
              <span className='font-base'>{role === 'assistant' ? 'ChatGPT' : 'Stanley'}</span>
              &nbsp;&middot; {timestamp && formatDate(timestamp.toString())}
            </>
          }
        </p>
      </div>
    </div>
  )
}
