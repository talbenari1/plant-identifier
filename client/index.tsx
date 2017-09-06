import { createBrowserHistory as createHistory } from 'history'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store
} from 'redux'
import thunk from 'redux-thunk'
import App from './components/App'
import { reducers, RootState } from './reducers'

const history = createHistory()
const preloadedState: RootState = (window as any).__PRELOADED_STATE__

delete (window as any).__PRELOADED_STATE__

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// define the redux store
const store: Store<RootState> = createStore(
  combineReducers(reducers),
  preloadedState,
  composeEnhancers(applyMiddleware(thunk))
)

// generate the app container
const container = (root: React.ComponentType): JSX.Element =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={root} />
    </ConnectedRouter>
  </Provider>

if (module.hot) {
  const { AppContainer } = require('react-hot-loader') // tslint:disable-line no-var-requires

  render(
    <AppContainer>{container(App)}</AppContainer>,
    document.getElementById('frame')
  )

  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    render(
      <AppContainer>{container(NextApp)}</AppContainer>,
      document.getElementById('frame')
    )
  })
} else {
  render(container(App), document.getElementById('frame'))
}
