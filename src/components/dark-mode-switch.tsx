import detectClickOutside from "@/tools/detectClickOutside";
import { ComputerDesktopIcon, LockClosedIcon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export default function DarkModeButton() {
    const [mounted, setMounted] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const { theme, setTheme, systemTheme } = useTheme()
    const menuRef = useRef<HTMLDivElement>(null); 
    
    const handleClick = (mode:string) => {
        setTheme(mode)
        handleShowMenu()
    }

    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    detectClickOutside(menuRef, () => {
        setShowMenu(false)
    })

    useEffect(() => {
        setMounted(true)
    },[])

    return (
        <div className='grid relative z-20 select-none'>
            <div 
                onClick={() => mounted ? handleShowMenu() : null}
                className='w-auto h-10 grid place-content-center dark:duration-0 text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-neutral-200 bg-neutral-100/50 hover:bg-neutral-200/50 dark:bg-neutral-950 dark:hover:bg-neutral-800 rounded-full px-3 cursor-pointer'
            >
                {
                    showMenu &&
                        <XMarkIcon className='w-5 h-5' />
                }
                {
                    !showMenu && mounted &&
                        <>
                            {
                                theme === 'light' &&
                                    <SunIcon className='w-5 h-5' />
                            }
                            {
                                theme === 'dark' &&
                                    <MoonIcon className='w-5 h-5' />
                            }
                            {
                                (theme === 'system' && systemTheme === 'light') &&
                                    <SunIcon className='w-5 h-5' />

                            }
                            {
                                (theme === 'system' && systemTheme === 'dark') &&
                                    <MoonIcon className='w-5 h-5' />
                            }
                        </>
                }
                {
                    !mounted &&
                        <SunIcon className='w-5 h-5' />
                }
                
            </div>
            {
                showMenu &&
                    <div ref={menuRef} className='grid gap-2 absolute top-11 right-0 py-3 animate-pop-up-from-bottom bg-white dark:bg-redax-light px-3 border border-neutral-200 dark:border-redax-lighter shadow-sm rounded-[10px]'>
                        {/* Dark mode */}
                        <div 
                            className={`w-auto h-10 grid grid-flow-col gap-3 items-center justify-start ${theme === 'dark' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-800 dark:text-neutral-300' } bg-neutral-100/50 hover:bg-neutral-200/50 dark:bg-redax-medium dark:hover:bg-redax-dark cursor-pointer rounded-full px-3`}
                            onClick={() => mounted ? handleClick('dark') : null}
                        >
                            <MoonIcon className='w-5 h-5' />
                            <p className="text-sm">Dark</p>
                        </div>
                        {/* Light mode */}
                        <div 
                            className={`w-auto h-10 grid grid-flow-col gap-3 items-center justify-start ${theme === 'light' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-800 dark:text-neutral-300' } bg-neutral-100/50 hover:bg-neutral-200/50 dark:bg-redax-medium dark:hover:bg-redax-dark cursor-pointer rounded-full px-3`}
                            onClick={() => mounted ? handleClick('light') : null}
                        >
                            <SunIcon className='w-5 h-5' />
                            <p className="text-sm">Light</p>
                        </div>
                        {/* System mode (auto) */}
                        <div
                            className={`w-auto h-10 grid grid-flow-col gap-3 items-center justify-start ${theme === 'system' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-800 dark:text-neutral-300' } bg-neutral-100/50 hover:bg-neutral-200/50 dark:bg-redax-medium dark:hover:bg-redax-dark cursor-pointer rounded-full px-3`}
                            onClick={() => mounted ? handleClick('system') : null}
                        >
                            <ComputerDesktopIcon className='w-5 h-5' />
                            <p className="text-sm">System</p>
                        </div>
                    </div>
            }
        </div>
    )
}