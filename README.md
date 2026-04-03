# Avantos Journey Builder React Coding Challenge

Built with Vite, React, and TypeScript!

## Run locally

1. Start the mock server:

```bash
git clone https://github.com/mosaic-avantos/frontendchallengeserver tmp/frontendchallengeserver
cd tmp/frontendchallengeserver
npm install
npm start
```

2. Start the client:

```bash
cp .env.example .env
npm install
npm run dev
```

3. Open the Vite URL, usually `http://localhost:5173`.

## Commands

- `npm run dev` starts the app
- `npm run test` runs the Vitest suite

## How It’s Organized

- `src/api`
  Fetches the graph data.
- `src/utils/graph.ts`
  Prepares form data and DAG relationships for the UI.
- `src/prefill/catalog.ts`
  Builds the list of available prefill sources.
- `src/components`
  UI components for the form list, editor, and modal.
- `src/data/prefillDefaults.ts`
  Demo mapping data for the initial UI.

## Adding a new prefill data source

The extension point is `src/prefill/catalog.ts`.

1. Add a new `PrefillSourceDefinition`.
2. Return grouped options from `getGroups(context)`.
3. Add it to the `registry`.

The modal only reads grouped options, so most new data sources can be added without changing the UI.

## Testing approach

- `src/utils/graph.test.ts` tests DAG traversal.
- `src/prefill/catalog.test.ts` tests source grouping.
- `src/App.test.tsx` tests the main mapping flow.
