//  ======
//  Sidebar footer showing chat sessions
//  ======

import Overlay from "./overlay";
import Privacy from "@/menus/privacy";

export default function ConversationsFooter() {
  return (
    <div className='grid w-full h-[var(--footer-height)] gap-3 grid-flow-col justify-between items-center px-5 md:px-6 xl:px-8 bg-white dark:bg-redax-medium'>
      {/* <Overlay overlayType='popup' title='Share feedback' content={<Feedback />}>
        <Button
          icon={<LightBulbIcon />}
          text='Share feedback'
          dontHideText
        />
      </Overlay> */}
        <p className="text-sm text-neutral-400/60 dark:text-neutral-500/70 tracking-tight">Goodeye &copy;2023</p>
      <Overlay overlayType='popup' title='Privacy policy' content={<Privacy />}>
        <p className="cursor-pointer text-sm text-neutral-400/60 dark:text-neutral-500/70 tracking-tight">Privacy policy</p>
      </Overlay>
    </div>
  )
}