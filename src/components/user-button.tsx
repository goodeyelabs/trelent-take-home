//  ======
//  User settings menu popup button
//  ======

import { ArrowPathIcon, Cog8ToothIcon, EllipsisVerticalIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useTheme } from "next-themes"
import { useRef, useState } from "react"
import { persistor } from '@/redux/store'
import { useDispatch } from "react-redux"
import { setAuth } from "@/redux/commonReducer"
import ClickAwayListener from 'react-click-away-listener';
import Button from "./button"

export default function UserButton({ mode }: { mode?: string }) {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const { theme } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)

  const handleReset = () => {
    // Redux-persist flushing functionality

    persistor.pause()

    persistor.flush().then(() => {
      persistor.purge()
      return window.location.reload()
    })
  }

  const handleSignOut = () => {
    dispatch(setAuth(false))
  }

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className='grid relative z-20 select-none'>
      <Button dontHideText onClick={() => handleShowMenu()} text={mode && 'Settings'} icon={<Cog8ToothIcon />} />
      {
        showMenu && (<ClickAwayListener onClickAway={() => setShowMenu(false)}>
          <div ref={menuRef} className='grid w-[200px] gap-2 absolute top-11 right-0 py-3 animate-pop-up-from-bottom bg-white dark:bg-redax-light px-3 border border-neutral-200 dark:border-redax-lighter shadow-sm rounded-[10px]'>
            {/* Sign out */}
            <div
              className={`w-auto h-10 grid grid-flow-col gap-3 items-center justify-start ${theme === 'dark' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-800 dark:text-neutral-300'} bg-neutral-100/50 hover:bg-neutral-200/50 dark:bg-redax-medium dark:hover:bg-redax-dark cursor-pointer rounded-full px-3`}
              onClick={handleSignOut}
            >
              <UserIcon className='w-5 h-5' />
              <p className="text-sm">Sign out (Stanley)</p>
            </div>
            {/* Reset demo data */}
            <div
              className={`w-auto h-10 grid grid-flow-col gap-3 items-center justify-start ${theme === 'light' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-800 dark:text-neutral-300'} bg-neutral-100/50 hover:bg-neutral-200/50 dark:bg-redax-medium dark:hover:bg-redax-dark cursor-pointer rounded-full px-3`}
              onClick={handleReset}
            >
              <ArrowPathIcon className='w-5 h-5' />
              <p className="text-sm">Reset demo data</p>
            </div>
          </div>
        </ClickAwayListener>)
      }
    </div>
  )
}