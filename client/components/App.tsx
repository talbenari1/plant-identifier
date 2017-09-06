import * as React from 'react'
import Analyzer from './Analyzer'
import Camera from './Camera'

export const App: React.StatelessComponent<{}> = () =>
  <div className="root">
    <Camera />
    <Analyzer />
  </div>

export default App
