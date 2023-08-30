//  ======
//  Sidebar footer showing chat sessions
//  ======

import Overlay from "./overlay";
import Privacy from "@/menus/privacy";

export default function ConversationsFooter() {
  return (
    <div className='grid w-full h-[var(--footer-height)] gap-4 grid-flow-col justify-start items-center content-center px-5 md:px-6 xl:px-8 bg-mulberry-faint dark:bg-redax-medium text-[14px] text-mulberry-light dark:text-neutral-500/70 '>
      <p>Goodeye &copy;2023</p>
      <p>|</p>
      <Overlay overlayType='popup' title='Privacy policy' content={<Privacy />}>
        <p className="cursor-pointer hover:text-mulberry">Privacy</p>
      </Overlay>
    </div>
  )
}