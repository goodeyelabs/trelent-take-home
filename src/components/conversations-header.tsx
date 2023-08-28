//  ======
//  Sidebar header containing (currently fake) chat search, and real new chat button
//  ======

import { MagnifyingGlassIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import NewChatButton from "./new-chat-button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addChat } from "@/redux/sessionsReducer";
import { setSearchTerm } from "@/redux/commonReducer";

export default function ConversationsHeader({ closeOverlay }: { closeOverlay?: any }) {
  const dispatch = useAppDispatch()
  const { searchTerm } = useAppSelector(state => state.common.data)

  function handleChange(e: any) {
    const str = e.currentTarget.value
    dispatch(setSearchTerm(str))
  }

  function handleNew() {
    dispatch(addChat())
    closeOverlay ? closeOverlay() : null
  }

  return (
    <div className='grid h-[var(--sub-header-height)] gap-3 grid-flow-col px-5 md:px-6 xl:pl-8 xl:pr-8 items-center bg-blue-25 dark:bg-redax-medium'>
      <div className='grid grid-cols-[1fr_auto] gap-3 grid-flow-col items-center'>
        <div className='grid gap-1 grid-cols-[auto_1fr] min-h-[40px] items-center py-2 px-4 bg-white dark:bg-redax-lighter shadow-[inset_0_0_0_1px] shadow-neutral-300/60 dark:shadow-redax-lighter rounded-[calc(40px/2)]'>
          <MagnifyingGlassIcon className='w-4 h-4 text-neutral-400' />
          <textarea
            rows={1}
            placeholder='Search chats...'
            value={searchTerm}
            onChange={handleChange}
            className='grid w-full resize-none text-base md:text-sm font-medium tracking-slight bg-white dark:bg-redax-lighter text-neutral-600 dark:text-neutral-300 placeholder:text-neutral-400 appearance-none outline-none overflow-y-hidden'>
          </textarea>
        </div>
        <NewChatButton
          icon={<PencilSquareIcon />}
          text='New'
          onClick={handleNew}
        />
      </div>
    </div>
  )
}