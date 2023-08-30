//  ======
//  Sidebar header containing (currently fake) chat search, and real new chat button
//  ======

import { MagnifyingGlassIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import Button from "./button";
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
    <div className='grid h-[var(--sub-header-height)] gap-3 grid-flow-col px-5 md:px-6 xl:pl-8 xl:pr-8 items-center bg-mulberry-faint dark:bg-redax-medium'>
      <div className='grid grid-cols-[1fr_auto] gap-3 grid-flow-col items-center'>
        <div className='grid gap-2 grid-cols-[auto_1fr] min-h-[40px] items-center py-2 px-3 bg-white dark:bg-redax-lighter shadow-[inset_0_0_0_1px] shadow-neutral-300/60 dark:shadow-redax-lighter rounded-[20px]'>
          <MagnifyingGlassIcon className='w-4 h-4 text-neutral-400' />
          <textarea
            rows={1}
            placeholder='Search chats...'
            value={searchTerm}
            onChange={handleChange}
            className='grid w-full resize-none text-[16px] md:text-[15px] font-medium bg-white dark:bg-redax-lighter text-mulberry-medium tracking-tight dark:text-neutral-300 placeholder:text-neutral-400 appearance-none outline-none overflow-y-hidden'>
          </textarea>
        </div>
        <Button
          icon={<PencilSquareIcon />}
          text='New'
          onClick={handleNew}
          customBg={'transition-all duration-75 bg-mulberry-lighter hover:bg-indigo-200/50 dark:bg-black dark:hover:bg-mulberry-dark/50'}
          customTextColor={'text-mulberry-medium hover:text-mulberry-dark dark:text-purple-400 hover:dark:text-purple-300'}
        />
      </div>
    </div>
  )
}