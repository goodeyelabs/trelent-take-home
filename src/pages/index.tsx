import { MessageList } from "@/components/message-list";
import { NewMessageForm } from "@/components/new-message-form";
import MessagesFooter from "@/components/messages-footer";
import Messages from "@/components/messages";

export default function HomePage() {
  return (
    <div className="grid grid-rows-[3.75rem_1fr] grid-cols-[1fr] md:grid-cols-[minmax(auto,300px)_1fr] lg:grid-cols-[minmax(auto,380px)_1fr] h-screen h-screen-ios">
        <div className="z-20 grid row-start-1 col-span-full shadow-[0_1px_0_0] shadow-neutral-200">
            {/* <Header /> */}
        </div>
        <div className="z-10 hidden md:grid row-start-2 shadow-[1px_0_0_0] shadow-neutral-200/80 dark:shadow-redax-lighter bg-blue-25 dark:bg-redax-medium overflow-y-auto">
            {/* <SideMenu /> */}
        </div>
        <div className="z-0 grid row-start-2 shadow-[1px_0_0_0] shadow-neutral-200 bg-white dark:bg-redax overflow-y-auto">
            <div className="grid grid-rows-[1fr_auto]">
                <div className="grid h-full grid-rows-[auto_1fr]">
                    <div className="grid">
                        {/* <MessagesHeader /> */}
                    </div>
                    <div className="grid items-start">
                        <Messages />
                        {/* <MessageList /> */}
                    </div>
                </div>
                <div className="grid sticky bottom-0 bg-blue-25">
                    <MessagesFooter />
                    {/* <NewMessageForm /> */}
                </div>
            </div>
        </div>
    </div>
  )
}
