//  ======
//  Top bar at head of message list, could in future become sticky and contain message navigation functionality
//  ======

import { SparklesIcon } from "@heroicons/react/24/outline"

export default function MessagesHeader() {
  return (
    <div className='grid h-[var(--sub-header-height)] gap-3 grid-flow-col px-5 md:px-6 xl:px-12 bg-white dark:bg-redax border-t border-neutral-200 border-none items-center'>
      <div className='grid gap-3 grid-flow-col place-content-center text-mulberry-light dark:text-neutral-500/50 tracking-slight'>
        <SparklesIcon className="w-5 h-5" />
        <p className="text-sm font-normal">New chat session started</p>
        <SparklesIcon className="w-5 h-5 rotate-180" />
      </div>
    </div>
  )
}