import * as React from 'react'
import { Provider } from 'react-redux'
import * as renderer from 'react-test-renderer'
import { combineReducers } from 'redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { reducers } from '../../reducers'
import { App } from '../App'

const mockStore = configureMockStore([thunk])
const reducer = combineReducers(reducers)
const initialState = reducer({}, { type: undefined })

describe('The App Component', () => {
  it('should be able to render', () => {
    const store = mockStore(initialState)
    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
