//  ======
//  Custom button component allowing for text only, icon only, or both together
//  ======

import { cloneElement } from 'react';

type buttonProps = {
	text?: string,
	icon?: any,
	onClick?: any,
	dontHideText?: boolean,
	customRounded?: string,
	customBg?: string,
	customTextColor?: string,
}

const defaultBg = 'bg-mulberry-faint hover:bg-mulberry-lighter dark:bg-neutral-950 dark:hover:bg-neutral-800'
const defaultTextColor = 'text-mulberry-medium hover:text-mulberry-dark dark:text-neutral-300 dark:hover:text-neutral-200'

function Button({ icon, text, customRounded, onClick, dontHideText, customBg, customTextColor }: buttonProps) {
	const styledIcon = icon ? cloneElement(icon, { className: 'h-5 w-5' }) : null

	return (
		<button
			onClick={onClick || null}
			className={`transition-all ease-in-out duration-75 dark:duration-0 ${customTextColor ? customTextColor : defaultTextColor} ${customBg ? customBg : defaultBg} font-medium grid place-content-center items-center gap-2 group cursor-pointer h-[40px] ${dontHideText ? 'w-auto' : 'w-[40px] md:w-auto'} grid-flow-col text-sm font-medium  justify-items-center px-3 ${text ? 'pr-3' : 'pr-3'} ${customRounded ? customRounded : ' rounded-[20px]'} border-0 outline-none select-none `}
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