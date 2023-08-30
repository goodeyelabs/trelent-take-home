//  ======
//  Main layout view for whole app
//  ======

import MessageList from "@/components/message-list";
import Header from "@/components/header";
import MessagesHeader from "@/components/messages-header";
import SideMenu from "@/components/sidemenu";
import FloatingInput from "@/components/floating-input";

export default function HomePage() {
  return (
    <div className="grid grid-rows-[var(--header-height)_1fr] grid-cols-[1fr] md:grid-cols-[minmax(auto,350px)_1fr] lg:grid-cols-[minmax(auto,350px)_1fr] h-screen h-screen-ios">
      <div className="z-20 grid row-start-1 col-span-full shadow-[0_1px_0_0] shadow-neutral-200">
        <Header />
      </div>
      <div className="z-10 hidden md:grid row-start-2 shadow-[1px_0_0_0] shadow-neutral-200/80 dark:shadow-redax-lighter bg-mulberry-faint dark:bg-redax-medium overflow-y-auto">
        <SideMenu />
      </div>
      <div className="z-0 grid row-start-2 shadow-[1px_0_0_0] shadow-neutral-200 bg-white dark:bg-redax overflow-y-auto">
        <div className="grid grid-rows-[1fr_auto]">
          <div className="grid h-full grid-rows-[auto_1fr]">
            <div className="grid">
              <MessagesHeader />
            </div>
            <div className="grid items-start">
              <MessageList />
            </div>
          </div>
          <div className="grid sticky bottom-0">
            <FloatingInput />
          </div>
        </div>
      </div>
    </div>
  )
}
