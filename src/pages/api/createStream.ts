import { ChatGPTStream } from "@/tools/parseChatGPTStream";
import { MessageType } from "@/types";

export const config = {
  runtime: "edge",
};


//
// Prepare payload to post to OpenAI chat endpoint
//

const handler = async (req: Request): Promise<Response> => {
    const { messageList } = (await req.json()) as {
        messageList?: MessageType[];
    };

    const payload = {
        model: "gpt-3.5-turbo",
        messages: messageList,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 1000,
        stream: true, // important, if set to false, we need to not use eventsource for streaming
        n: 1,
    };

  const stream = await ChatGPTStream(payload);
  return new Response(stream);
};

export default handler;