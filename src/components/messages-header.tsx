import { SparklesIcon } from "@heroicons/react/24/outline";

export default function MessagesHeader() {
    return (
        <div className='grid h-[var(--sub-header-height)] gap-3 grid-flow-col px-5 md:px-6 xl:px-12 bg-white dark:bg-redax border-t border-neutral-200 border-none items-center'>
            <div className='grid gap-3 grid-flow-col place-content-center text-neutral-500/50'>
                <SparklesIcon className="w-5 h-5"/>
                <p className="text-sm font-base tracking-slight">New chat session started</p>
                <SparklesIcon className="w-5 h-5 rotate-180"/>
            </div> 
        </div>
    )
}