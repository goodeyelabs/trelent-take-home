//  ======
//  Individual message bubble, with different renders for user/assistant
//  ======

import { formatDate } from '@/tools/common'
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
  let bubble = 'grid bg-neutral-100/50 dark:bg-redax-light rounded-[10px] px-2.5 md:px-3 xl:px-4'
  let bubbleText = 'text-sm font-base tracking-slight leading-relaxed text-gray-950 dark:text-stone-300 py-2'

  if (role === 'user') {
    bubbleWrap = 'grid px-2.5 md:px-3 xl:px-4 animate-pop-up-from-bottom'
    bubbleOuter = 'grid gap-2 w-[90%] place-self-end justify-end justify-items-end py-4'
    bubble = 'grid bg-gradient-to-r from-blue-500 to-sky-400 rounded-[10px] px-2.5 md:px-3 xl:px-4'
    bubbleText = 'text-sm font-base tracking-slight leading-relaxed text-white py-2'
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
            {// eslint-disable-next-line
              <ReactMarkdown children={content ? content : ''} remarkPlugins={[remarkGfm]} />
            }
          </div>
        </div>
        <p className='text-xs text-neutral-400/80 dark:text-neutral-500/70 tracking-normal'>
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
