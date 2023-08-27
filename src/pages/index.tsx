import { MessageList } from "@/components/message-list";
import { NewMessageForm } from "@/components/new-message-form";
import { MessagesProvider } from "@/hooks/use-messages";

export default function HomePage() {
  return (
    <MessagesProvider>
      <MessageList />
      <NewMessageForm />
    </MessagesProvider>
  )
}
