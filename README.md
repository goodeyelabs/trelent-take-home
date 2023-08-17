# Trelent take-home

The goal of this test is to assess your ability to build a simple NextJS application that uses Tailwind for styling, and which interacts with OpenAI's chat API. Upon successful completion, you should end up with a fully-functioning chat webapp similar to ChatGPT (and maybe even a little faster). This test is designed to take less than two hours to complete for the ideal candidate, however, we are not trying to test speed here! It is not timed, and the important thing we want to evaluate is your process, design decisions, and coding style.

## Task Description

Your goal for this project is to make the chat functional by integrating with OpenAI, and improve the design to your liking. You may use the method of your choice to do so, and may use the provided API key. We have found that, typically, streaming the response from OpenAI to the user is a good experience. Once completed, you should deploy a fully-functioning version of your project on Vercel.

## Resources

Relevant OpenAI Documentation can be found here: [https://platform.openai.com/docs/guides/gpt/chat-completions-api](https://platform.openai.com/docs/guides/gpt/chat-completions-api)
Helpful libraries may include:

1. [Vercel AI SDK](https://sdk.vercel.ai/docs)
2. [openai-edge](https://github.com/dan-kwiat/openai-edge)

## Project structure

Some parts of the project already exist, such the basic page layout and some initial messages to demo what it looks like. It is a standard NextJS + Tailwind project, thought we opted to use the `pages` router instead of the `app` router. You can find components in `src/components`, all put together in a single page at `src/pages/index.tsx`. Some styling also occurs in `src/pages/_app.tsx`.

We have left the api directory empty, other than a default `api/hello` route for reference.

## Final thoughts

Thank you for applying to Trelent, and best of luck! You can always reach out to Calum if you have any questions or get stuck.
