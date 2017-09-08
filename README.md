# Plant Identifier: A Custom Vision Sample

Try it out: [aka.ms/plant](https://aka.ms/plant)

This project utilizes the Custom Vision API and the Bing Entity Search API in order to analyze an image of a plant and respond with its most confident prediction of what plant it is, as well as some information about the plant and the top result from Bing.

## IMPORTANT: Updating to the newest SDK version

Once the Cognitive Services SDK has been released, this repo will be out of date. Here's how you can fix it:

1. In the `package.json`, update the source of the `cognitive-services` package (and rename accordingly if needed).
1. Update `server/api.ts` to use the new SDK.
1. Update the types in `client/api.ts` to refer to the new types.

## Features

- **Cognitive Services SDK**: The Cognitive Services SDK makes it incredibly easy to leverage intelligent AI and other services directly from JavaScript. As mentioned above, this project utilizes the Custom Vision API and the Bing Entity Search API.

- **Classifier-agnostic**: Although the sample was built to identify plants, the only thing tying it to plants is the `<title>` tag in the HTML. Feel free to try it out with different classifiers.

- **Responsive and Mobile-First Design**: The app was designed to work well on phones and desktops alike. It feels at home within phone dimensions, yet seamlessly scales out to fill a larger display.

- **Single Page Application**: The app never has to reload the page or load another page, because all information is retrieved via AJAX calls to the backend. This results in a much smoother experience for the user.

- **Latest WebRTC APIs**: Browsers that support the `getUserMedia` protocol will allow the app to display a live camera feed directly in the app.

- **Graceful Degradation**: When browsers don't support certain features, the app will fall back on an alternative solution.

- **Server-Side Rendering**: The application is dynamically prerendered on the server before being sent to the client, which can often mean a faster load time.

- **Hot Module Reloading**: When running in development mode (via the environment variable `NODE_ENV`), the application will automatically inject updated React modules into the client.

## Technology Stack

- **Compiler**: The core language used is TypeScript, on both the client and the server. Each folder is bundled via Webpack using `awesome-typescript-loader`, and when Webpack is called in development mode, hot module bindings will be automatically injected into the generated client and server bundles.

- **Linter**: The core linting strategy is handled by TSLint, both as a standalone package and as a language service plugin into the TypeScript `tsserver`. Linting rules are provided by TSLint (the recommended rules), Standard JS, and then normalized for Prettier.

- **Client**: The client utilizes React for all views, and Redux for state management. There are no CSS preprocessors, but the CSS abides by the BEM methodology.

- **Server**: The server runs on Node.js and uses Express as its app framework. It uses Winston as a basic logging platform.
