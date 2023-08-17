import React from "react";
import { Message } from "./message";

export type MessageListProps = {
  messages: { role: string; content: string }[];
};
export const MessageList = (props: MessageListProps) => {
  const { messages } = props;

  return (
    <div className="overflow-auto mt-10">
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </div>
  );
};
