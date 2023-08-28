//  =======
//  Fetch the streamed ChatGPT response to our user's query, then parse the response,  
//  and then return the chunked response text
//  =======

import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser"

export async function ChatGPTStream(payload: any) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  })

  //  ChatGPT stores its response text entities to choices[0].delta.content,
  //  creating a new object for each word. We create a UTF-8 encoded stream of these text
  //  entities and return for decoding elsewhere

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data
          if (data === "[DONE]") {
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta.content
            //  TODO: Could also grab the unique chatgpt message id and use this to iteratively create our redux message entry in the future
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            controller.error(e)
          }
        }
      }

      // Parse text chunks as they happen
      const parser = createParser(onParse)

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
}