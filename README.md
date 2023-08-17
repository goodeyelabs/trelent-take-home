# Trelent take-home

The goal of this test is to assess your ability to build a simple NextJS application that uses Tailwind for styling, and which interacts with OpenAI's chat API. Upon successful completion, you should end up with a fully-functioning webapp similar to (or maybe even a little better than) ChatGPT!

This test is designed to take less than two hours to complete for the ideal candidate, however, we are not trying to test speed here! It is not timed, and the important thing we want to evaluate is your process, design decisions, and coding style.

## Task Description

Your goal for this project is to make the chat functional by integrating with OpenAI, and improve the design to your liking. You may use the method of your choice to do so, and may use the provided API key. We have found that, typically, streaming the response from OpenAI to the user is a good experience. Once completed, you should deploy a fully-functioning version of your project on Vercel.

## Instructions

To get started, go ahead and create a public repo on GitHub using this template. Once created and cloned to your machine, you may use a package manager of your choice (we recommend `pnpm` or `yarn`) to install the dependencies and start the project up with the `dev` script. Now would also be a good time to setup your Vercel deployment and make sure you get a successful build. If you don't, contact Calum.

> Make sure to set `OPENAI_API_KEY` in `.env.local.example` to the API key provided by Calum, and rename the file to be `.env.local`.

From here, you're on your own! We encourage you to use the resources below to help make this project more doable in a short period of time. You are more than welcome to add extra features, improve the design, or change the folder structure to your liking.

Once you feel confident and have a working chat app, Send Calum a link to your GitHub repo and your Vercel deployment.

## Resources

1. [OpenAI docs](https://platform.openai.com/docs/guides/gpt/chat-completions-api)
2. [Vercel AI SDK](https://sdk.vercel.ai/docs)
3. [openai-edge](https://github.com/dan-kwiat/openai-edge)

## Project structure

Some parts of the project already exist, such the basic page layout and some initial messages to demo what it looks like. It is a standard NextJS + Tailwind project, thought we opted to use the `pages` router instead of the `app` router. You can find components in `src/components`, all put together in a single page at `src/pages/index.tsx`. Some styling also occurs in `src/pages/_app.tsx`.

We have left the api directory empty, other than a default `api/hello` route for reference.

## Final thoughts

Once complete, please send Calum your repository and a link to your live vercel deployment. Thank you for applying to Trelent, and best of luck! You can always reach out to Calum if you have any questions or get stuck.
