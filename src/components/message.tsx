import { MessageType } from "@/types";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export type MessageProps = {
  message: MessageType;
};

export function Message(props: MessageProps) {
  const { message } = props;

  return (
    <div className="flex flex-row gap-4 p-2 first:rounded-t-md last:rounded-b-md text-black dark:text-white bg-white dark:bg-slate-800">
      <div className="shrink">
        {message.role === "user" ? (
          <>
            <span className="sr-only">Message from you</span>
            <p className="text-gray-500 dark:text-gray-300">You</p>
          </>
        ) : (
          <>
            <span className="sr-only">Message from bot</span>
            <p className="text-gray-500 dark:text-gray-300">ChatGPT</p>
          </>
        )}
      </div>

      {/* Maybe a non-plaintext format would be a bit nicer to read? */}
      <div><ReactMarkdown children={message ? message.content : ''} remarkPlugins={[remarkGfm]} /></div>
    </div>
  );
};
