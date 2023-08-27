'use client'
import React, { useState, useEffect, ReactElement } from 'react'
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';

type overlayProps = {
    content: ReactElement,
    overlayType: string,
    children?: any,
    title?: string,
}

export default function Overlay({ children, content, overlayType, title }:overlayProps) {
    const [overlayIsOpen, setOverlayIsOpen] = useState(false);
    const [overlayIsClosing, setOverlayIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const newContent = React.cloneElement(
        content,
        {closeOverlay: closeOverlay}
    )

    function Content() {
        switch(overlayType) {
            case 'drawer-right':
                return (
                    <div className={`${!overlayIsClosing ? 'animate-slide-in-from-right' : 'animate-slide-out-to-right'} grid transform-gpu z-20 w-[95%] sm:w-[450px] h-screen h-screen-ios overflow-y-auto bg-white dark:bg-redax justify-self-end shadow-xl grid-rows-[auto_1fr] items-start`}>
                        <Header />
                        {newContent}
                    </div>
                )
            case 'drawer-left':
                return (
                    <div className={`${!overlayIsClosing ? 'animate-slide-in-from-left' : 'animate-slide-out-to-left'} grid transform-gpu z-20 w-[95%] sm:w-[450px] h-screen h-screen-ios overflow-y-auto bg-white dark:bg-redax justify-self-start shadow-xl grid-rows-[auto_1fr] items-start`}>
                        <Header />
                        {newContent}
                    </div>
                )
            case 'popup':
                return (
                    <div className={`${!overlayIsClosing ? 'animate-pop-up-from-bottom' : 'animate-pop-down-to-bottom'} grid transform-gpu z-20 w-[95%] md:w-[650px] h-[60vh] md:h-[500px] mb-[2.5%] md:mb-0 bg-white dark:bg-redax justify-self-center self-end md:self-center rounded-2xl sm:rounded-xl shadow-xl items-start overflow-hidden`}>
                        <PopupHeader />
                        {newContent}
                    </div>
                )
            case 'menu':
                return (
                    <div className={`${!overlayIsClosing ? 'animate-pop-up-from-bottom' : 'animate-pop-down-to-bottom'} grid transform-gpu absolute z-20 w-auto h-auto justify-self-center self-center shadow-xl`}>
                        {newContent}
                    </div>
                )
            default:
                return null
        }
    }

    function Header() {
        return (
            <div className='grid grid-rows-[var(--header-height)] grid-cols-[auto_1fr] grid-flow-col items-center justify-between justify-items-end px-5 sm:px-8 bg-white dark:bg-redax border-b border-slate-200 dark:border-redax-lighter'>
                <div className='group grid col-start-1 row-start-1 grid-flow-col gap-2 items-center justify-start select-none cursor-pointer'>
                    <p className='text-xl text-gray-900 dark:text-neutral-300 font-bold tracking-slight truncate'>{title}</p>
                </div>
                <div className='grid place-content-center'>
                    <XMarkIcon onClick={() => closeOverlay()} className='x-6 h-6 text-zinc-900 dark:text-neutral-300 cursor-pointer hover:text-blue-400'/>
                </div>
            </div>
        )
    }

    function PopupHeader() {
        return (
            <div className='grid grid-rows-[var(--header-height)] grid-cols-[auto_1fr] grid-flow-col items-center justify-between justify-items-end px-5 sm:px-8 bg-white dark:bg-redax border-b border-slate-200 dark:border-redax-lighter'>
                <div className='group grid col-start-1 row-start-1 grid-flow-col gap-2 items-center justify-start select-none cursor-pointer'>
                    <p className='truncate text-zinc-800 dark:text-neutral-300 font-bold text-xl tracking-tight'>{title}</p>
                </div>
                <div className='grid place-content-center'>
                    <XMarkIcon onClick={() => closeOverlay()} className='x-6 h-6 text-zinc-900 dark:text-neutral-300 cursor-pointer hover:text-blue-40'/>
                </div>
            </div>
        )
    }

    function Wrapper() {
        return (
            <div id='overlay_wrapper' className='fixed grid w-screen h-screen h-screen-ios z-50 inset-0'>
                <div id='overlay_background' className={`${!overlayIsClosing ? 'animate-fade-in' : 'animate-fade-out'} transform-gpu z-10 absolute inset-0 cursor-pointer bg-zinc-950/[0.8] w-screen h-screen h-screen-ios`} onClick={closeOverlay} />
                <Content />
            </div>
        )
    }

    function closeOverlay() {
        setOverlayIsClosing(true);
    }
  
    useEffect(() => {
      if (overlayIsClosing) {
          const timer = setTimeout(() => {
              setOverlayIsOpen(false);
              setOverlayIsClosing(false);
          }, 250)
  
          return () => clearTimeout(timer);
      }
    }, [overlayIsClosing]);

    useEffect(() => {
        function handleEsc(event: any) {
            if (event.keyCode === 27) closeOverlay();
        }
        window.addEventListener('keydown', handleEsc);
  
        return () => window.removeEventListener('keydown', handleEsc);
    },[]);

    useEffect(() => {
        setIsMounted(true);
    },[setIsMounted])

    if (isMounted) {
        return (
            <>
                {React.cloneElement(
                    children,
                    {
                        onClick: () => setOverlayIsOpen(true),
                    }
                )}
                {overlayIsOpen && createPortal(
                    <Wrapper />,
                    document.body
                )}
            </>
        )
    }

    return (
        <>
            {children}
        </>    
    )
}