/**
 * The html template for the app.
 */

import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { Route, StaticRouter } from 'react-router'
import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import App from '../client/components/App'
import { reducers, RootState } from '../client/reducers'

// define the redux store
const store: Store<RootState> = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk)
)

const preloadedState = `window.__PRELOADED_STATE__ = JSON.parse('${JSON.stringify(
  store.getState()
)}')`

export default (url: string, context: RouterContext) =>
  renderToString(
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"
        />
        <link rel="stylesheet" href="/main.css" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="favicon/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="favicon/ms-icon-144x144.png"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta charSet="UTF-8" />
        <title>Plant Identifier</title>
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: preloadedState }} />
        <div id="frame">
          <Provider store={store}>
            <StaticRouter location={url} context={context}>
              <Route path="/" component={App} />
            </StaticRouter>
          </Provider>
        </div>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/superagent/3.5.2/superagent.min.js"
          integrity="sha256-+Q9O9GgDgx2GQxSNMzEIYgzPhcJWwURnlq46eymtmEE="
          crossOrigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js"
          integrity="sha256-ivdPAn5h6U67z6OPgwfiLM9ug6levxmYFqWNxNCV0YE="
          crossOrigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min.js"
          integrity="sha256-UEqn5+tyzezD6A5HBMNTlc5mXkmt+ohTfCBPtXMaGb0="
          crossOrigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/react-router/4.1.1/react-router.min.js"
          integrity="sha256-MeY9WmJInnn/hYw4NWDwfAgJ7APJxZZeRZX8hzjPvLw="
          crossOrigin="anonymous"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.7.2/redux.js" />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.5/react-redux.min.js"
          integrity="sha256-ruL3wNUkRPlfW7eq02mT+q8vEe6SS8eHVqr4zUtRuUc="
          crossOrigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/history/4.6.3/history.min.js"
          integrity="sha256-Q+YaxpXy5NPHoBP4oi8ij6Yd6EAV2jRxqoDUi0S+CLs="
          crossOrigin="anonymous"
        />
        <script
          src="https://unpkg.com/prop-types@15.5.10/prop-types.min.js"
          integrity="sha384-NhTBEJSJHzB8AnCM9HXat5q3eVIdsgif1g+PlSdkdvMjAqd9J+BTTNux2hFS+WjC"
          crossOrigin="anonymous"
        />
        <script
          src="https://unpkg.com/react-router-redux@5.0.0-alpha.6/umd/react-router-redux.min.js"
          integrity="sha384-DI6a8Z5EeWqiY17C4Wz6KvKfihKreUK3sfOOBkzM82/LsCG5lllsL9JOWINYCaK3"
          crossOrigin="anonymous"
        />
        <script
          src="https://unpkg.com/redux-thunk@2.2.0/dist/redux-thunk.min.js"
          integrity="sha384-clksQEsrkq4U3jNhSd+pCTsDFvPnSxN2xr0WUy2LOXFxC8KvqinvNJJ3656K5Tkf"
          crossOrigin="anonymous"
        />
        <script src="/client.bundle.js" />
      </body>
    </html>
  )
