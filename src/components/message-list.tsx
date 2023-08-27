import React from "react";
import { Message } from "./message";
import { useMessages } from "@/hooks/use-messages";

export function MessageList() {
  const { messages, generatedMessage, isPreparingAnswer, isGeneratingAnswer } = useMessages();

  return (
    <div className="overflow-auto mt-10">
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
      {
        generatedMessage &&
          <Message message={{role: 'assistant', content: generatedMessage}} key={'gen'} />
      }
      {
          isGeneratingAnswer && generatedMessage &&
            <p className="text-sm text-neutral-400">ChatGPT is typing...</p>
        }
        {
          isPreparingAnswer && !generatedMessage &&
            <p className="text-sm text-neutral-400">ChatGPT is thinking...</p>
        }
    </div>
  );
};
