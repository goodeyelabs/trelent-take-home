import { SparklesIcon, UserIcon } from "@heroicons/react/24/outline";

export type MessageProps = {
  message: { role: string; content: string };
};
export const Message = (props: MessageProps) => {
  const { message } = props;

  return (
    <div
      className={`flex flex-row gap-4 p-2 first:rounded-t-md last:rounded-b-md text-black dark:text-white ${
        message.role === "user"
          ? "bg-white dark:bg-slate-800"
          : "bg-gray-200 dark:bg-slate-600"
      }`}
    >
      <div className="shrink">
        {message.role === "user" ? (
          <UserIcon className="w-6 h-6" title="Message from you" />
        ) : (
          <SparklesIcon className="w-6 h-6" title="Response from AI" />
        )}
      </div>

      {/* Does displaying plaintext seem correct? */}
      <p className="grow">{message.content}</p>
    </div>
  );
};
