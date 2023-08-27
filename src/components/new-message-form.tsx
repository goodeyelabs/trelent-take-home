import { useMessages } from "@/hooks/use-messages";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function NewMessageForm() {
  const [newMessage, setNewMessage ] = useState('');
  const { messages, addMessage, generateMessage } = useMessages();

  function handleSubmit(newMessage:string) {
    addMessage({role: 'user', content: newMessage})
    generateMessage([...messages, {role: 'user', content: newMessage}])
    setNewMessage('')
  }

  return (
    <form
      className="grid p-2 fixed bottom-0 w-full lg:max-w-4xl flex items-center"
      onSubmit={(evt) => evt.preventDefault()}
    >
      <input
        type="text"
        className="w-full bg-transparent outline outline-1 rounded-md p-2 pr-10 dark:outline-white dark:text-white"
        value={newMessage}
        onChange={(e:any) => setNewMessage(e.target.value)}
        placeholder="Send a message..."
      />
      <button
        className="absolute right-3 rounded-lg p-1 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600"
        onClick={() => handleSubmit(newMessage)}
        type="submit"
      >
        <PaperAirplaneIcon className="w-6 h-6" />
      </button>
    </form>
  );
};
