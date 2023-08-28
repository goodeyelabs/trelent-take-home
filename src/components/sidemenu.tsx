//  ======
//  Sidebar wrapper component, so we can render either on left in larger views or as a left drawer on mobile
//  ======

import Conversations from "./conversations"
import ConversationFooter from "./conversations-footer"
import ConversationsHeader from "./conversations-header"

export default function SideMenu({ closeOverlay }: { closeOverlay?: any }) {
  return (
    <div className="grid h-full grid-rows-[1fr_auto]">
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="grid sticky top-0">
          <ConversationsHeader closeOverlay={closeOverlay} />
        </div>
        <div className="grid items-start">
          <Conversations closeOverlay={closeOverlay} />
        </div>
      </div>
      <div className="grid sticky bottom-0 bg-blue-25 shadow-[0_-1px_0_0] dark:shadow-redax-lighter shadow-neutral-200/80">
        <ConversationFooter />
      </div>
    </div>
  )
}