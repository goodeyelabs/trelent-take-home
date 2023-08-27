import { cloneElement } from 'react';

type buttonProps = {
    text?: string,
    icon?: any,
    customClass?: string,
    onClick?: any,
    dontHideText?:boolean,
}

function Button({ icon, text, customClass, onClick, dontHideText }:buttonProps) {
    const styledIcon = icon ? cloneElement(icon, {className: 'h-5 w-5'}) : null

    return (
        <button 
            onClick={onClick || null} 
            className={`transition-all ease-in-out duration-75 dark:duration-0 text-neutral-700/90 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-200 bg-neutral-100/50 hover:bg-neutral-200/50 dark:bg-neutral-950 dark:hover:bg-neutral-800 grid place-content-center items-center gap-2 group cursor-pointer h-[40px] ${dontHideText ? 'w-auto' : 'w-[40px] md:w-auto'} grid-flow-col text-sm font-medium tracking-slight justify-items-center px-3 ${text ? 'pr-3' : 'pr-3'} rounded-[20px] border-0 outline-none select-none `}
        >
            {
                icon &&
                    styledIcon
            }
            {
                text &&
                    <span className={`${dontHideText ? 'grid' : 'hidden md:grid'} truncate`}>{text}</span>
            }
        </button>
    )
}

export default Button