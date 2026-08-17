## Goal

Establish the minimal server-side infrastructure required to communicate with the model from the inventory application.

## Scope

- Add the Vercel AI SDK / OpenAI SDK dependencies.
- Configure the OpenAI API key through environment variables.
- Create the server-side endpoint used by the inventory assistant.
- Use the OpenAI Responses API.
- Support streaming responses/tool calls.
- Add basic error handling for:
  - API errors
  - invalid requests
  - missing configuration

- Keep all OpenAI calls server-side.

## Acceptance criteria

- A React component can send a request to the AI endpoint.
- The endpoint successfully calls the configured model.
- A streamed response can be received by the frontend.
- OpenAI credentials are never exposed client-side.
- Errors result in a controlled application response rather than an unhandled exception.

**Estimated effort: 0.5 day**
