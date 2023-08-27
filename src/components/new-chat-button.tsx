import { cloneElement } from 'react';

type buttonProps = {
    text?: string,
    icon?: any,
    onClick?: any,
}

function NewChatButton({ icon, text, onClick }:buttonProps) {
    const styledIcon = cloneElement(
        icon, {className: 'h-5 w-5'},
    )

    return (
        <button 
            onClick={onClick || null} 
            className='grid place-content-center items-center gap-2 group cursor-pointer h-[38px] w-auto grid-flow-col text-neutral-100 bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-purple)] hover:brightness-110 text-sm font-medium tracking-slight justify-items-center px-3 pr-3 transition-all duration-75 ease-in-out rounded-[20px] border-0 outline-none select-none '
        >
            {
                icon &&
                    styledIcon
            }
            {
                text &&
                    <span className={`grid truncate`}>{text}</span>
            }
        </button>
    )
}

export default NewChatButton