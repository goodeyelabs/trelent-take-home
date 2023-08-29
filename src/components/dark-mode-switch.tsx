//  ======
//  Appearance mode toggler (Dark/Light/System)
//  ======

import { ComputerDesktopIcon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useTheme } from "next-themes"
import { useRef, useState } from "react"
import ClickAwayListener from "react-click-away-listener"
import Button from "./button"

export default function DarkModeButton({ mode }: { mode?: string }) {
  const [showMenu, setShowMenu] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()
  const appearanceMenuRef = useRef<HTMLDivElement>(null)

  const handleClick = (mode: string) => {
    setTheme(mode)
    handleShowMenu()
  }

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className='grid relative z-20 select-none'>
      {
        theme === 'light' &&
        <Button customRounded='rounded-full' dontHideText onClick={() => handleShowMenu()} text={mode && 'Light'} icon={<SunIcon />} />
      }
      {
        theme === 'dark' &&
        <Button customRounded='rounded-full' dontHideText onClick={() => handleShowMenu()} text={mode && 'Dark'} icon={<MoonIcon />} />
      }
      {
        theme === 'system' && systemTheme === 'light' &&
        <Button customRounded='rounded-full' dontHideText onClick={() => handleShowMenu()} text={mode && 'System'} icon={<SunIcon />} />
      }
      {
        theme === 'system' && systemTheme === 'dark' &&
        <Button customRounded='rounded-full' dontHideText onClick={() => handleShowMenu()} text={mode && 'System'} icon={<MoonIcon />} />
      }
      {
        showMenu && (<ClickAwayListener onClickAway={() => setShowMenu(false)}>
          <div ref={appearanceMenuRef} className='grid gap-2 absolute top-11 right-0 py-3 animate-pop-up-from-bottom bg-white dark:bg-redax-light px-3 border border-neutral-200 dark:border-redax-lighter shadow-sm rounded-[10px]'>
            {/* Dark mode */}
            <div
              className={`w-auto h-10 grid grid-flow-col gap-3 items-center justify-start ${theme === 'dark' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-800 dark:text-neutral-300'} bg-neutral-100/50 hover:bg-neutral-200/50 dark:bg-redax-medium dark:hover:bg-redax-dark cursor-pointer rounded-full px-3`}
              onClick={() => handleClick('dark')}
            >
              <MoonIcon className='w-5 h-5' />
              <p className="text-sm">Dark</p>
            </div>
            {/* Light mode */}
            <div
              className={`w-auto h-10 grid grid-flow-col gap-3 items-center justify-start ${theme === 'light' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-800 dark:text-neutral-300'} bg-neutral-100/50 hover:bg-neutral-200/50 dark:bg-redax-medium dark:hover:bg-redax-dark cursor-pointer rounded-full px-3`}
              onClick={() => handleClick('light')}
            >
              <SunIcon className='w-5 h-5' />
              <p className="text-sm">Light</p>
            </div>
            {/* System mode (auto) */}
            <div
              className={`w-auto h-10 grid grid-flow-col gap-3 items-center justify-start ${theme === 'system' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-800 dark:text-neutral-300'} bg-neutral-100/50 hover:bg-neutral-200/50 dark:bg-redax-medium dark:hover:bg-redax-dark cursor-pointer rounded-full px-3`}
              onClick={() => handleClick('system')}
            >
              <ComputerDesktopIcon className='w-5 h-5' />
              <p className="text-sm">System</p>
            </div>
          </div>
        </ClickAwayListener>)
      }
    </div>
  )
}