//  ======
//  Main app header bar (at the top!)
//  ======

import { Bars3BottomRightIcon, ChevronLeftIcon, UserIcon } from '@heroicons/react/24/outline'
import Button from './button'
import Image from 'next/image'
import Overlay from './overlay'
import SideMenu from './sidemenu'
import How from '@/menus/how'
import Help from '@/menus/help'
import Upgrade from '@/menus/upgrade'
import DarkModeSwitch from './dark-mode-switch'
import UserButton from './user-button'
import Feedback from '@/menus/feedback'
import Privacy from '@/menus/privacy'

function RightMenu() {
  return (
    <div className='grid grid-flow-row gap-4 h-full grid-rows-[auto_1fr] items-start content-start py-4 px-5 sm:px-8 md:px-12px lg:px-16px'>
      <div className='grid grid-flow-col grid-cols-2 gap-3 pb-4 border-b border-dashed border-neutral-200 dark:border-redax-lighter'>
        <DarkModeSwitch mode={'text'} />
        <UserButton mode={'text'} />
      </div>
      <div className='grid auto-rows-[var(--header-height)] justify-center justify-items-center items-center content-center h-full pb-[var(--header-height)]'>
        <Overlay overlayType='popup' title='Upgrade to Enterprise' content={<Upgrade />}>
          <p className='text-xl text-neutral-800 dark:text-neutral-200 hover:text-neutral-400 dark:hover:text-neutral-500 cursor-pointer font-semibold'>Upgrade</p>
        </Overlay>
        <Overlay overlayType='popup' title='How to use' content={<How />}>
          <p className='text-xl text-neutral-800 dark:text-neutral-200 hover:text-neutral-400 dark:hover:text-neutral-500 cursor-pointer font-semibold'>How to use</p>
        </Overlay>
        <Overlay overlayType='popup' title='Get help' content={<Help />}>
          <p className='text-xl text-neutral-800 dark:text-neutral-200 hover:text-neutral-400 dark:hover:text-neutral-500 cursor-pointer font-semibold'>Get help</p>
        </Overlay>
        <Overlay overlayType='popup' title='Send feedback' content={<Feedback />}>
          <p className='text-xl text-neutral-800 dark:text-neutral-200 hover:text-neutral-400 dark:hover:text-neutral-500 cursor-pointer font-semibold'>Send feedback</p>
        </Overlay>
        <Overlay overlayType='popup' title='Privacy policy' content={<Privacy />}>
          <p className='text-xl text-neutral-800 dark:text-neutral-200 hover:text-neutral-400 dark:hover:text-neutral-500 cursor-pointer font-semibold'>Privacy policy</p>
        </Overlay>
      </div>
    </div>
  )
}

function TopMenu() {
  return (
    <>
      <div className='grid grid-flow-col gap-8 h-full items-center text-[15px] font-semibold text-mulberry-dark dark:text-neutral-400'>
        <Overlay overlayType='popup' title='Upgrade to Enterprise' content={<Upgrade />}>
        <div className='h-full grid place-content-center cursor-pointer hover:text-mulberry dark:hover:text-neutral-200'>
            <p>Upgrade</p>
          </div>
        </Overlay>
        <Overlay overlayType='popup' title='Get help' content={<Help />}>
          <div className='h-full grid place-content-center cursor-pointer hover:text-mulberry dark:hover:text-neutral-200'>
            <p>Get help</p>
          </div>
        </Overlay>
        <Overlay overlayType='popup' title='Send feedback' content={<Feedback />}>
        <div className='h-full grid place-content-center cursor-pointer hover:text-mulberry dark:hover:text-neutral-200'>
            <p>Send feedback</p>
          </div>
        </Overlay>
        <div className='w-[1px] h-5 border-r border-neutral-300 dark:border-neutral-800 border-dotted' />
      </div>
      <div className='grid grid-flow-col gap-3 items-center cursor-pointer pl-8'>
        <DarkModeSwitch />
        <UserButton />
      </div>
    </>
  )
}

export default function Header() {
  return (
    <div className='select-none grid gap-3 grid-cols-[auto_auto_1fr] md:grid-cols-[auto_1fr] h-full px-4 md:px-6 xl:px-8 bg-white dark:bg-redax-dark/70 items-center shadow-[0_1px_0_0] shadow-gray-200 dark:shadow-redax-light'>
      <div className='grid justify-items-start md:hidden cursor-pointer'>
        <Overlay overlayType='drawer-left' title='Chats' content={<SideMenu />}>
          <ChevronLeftIcon className='w-6 h-auto' />
        </Overlay>
      </div>
      <div className='grid grid-flow-col items-center gap-2 cursor-pointer'>
        <Image
          src='/logo.svg'
          alt='Logo'
          width='64'
          height='69'
          className='hidden md:grid w-5 md:w-6 h-fit drop-shadow-md'
        />
        <p className='grid grid-flow-col text-xl text-gray-900 dark:text-neutral-200 font-extrabold '>Trelent<span className='er font-normal pl-0.5 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-light-blue)] to-[var(--color-pink-red)]'>GPT</span></p>
      </div>
      <div className='grid justify-items-end lg:hidden'>
        <Overlay overlayType='drawer-right' title='TrelentGPT' content={<RightMenu />}>
          <Bars3BottomRightIcon className='w-6 h-auto cursor-pointer' />
        </Overlay>
      </div>
      <div className='hidden lg:grid grid-flow-col justify-end items-center'>
        <TopMenu />
      </div>
    </div>
  )
}