import * as React from 'react'

const AppBar: React.StatelessComponent = ({ children }) =>
  <div className="app-bar-wrapper">
    <div className="app-bar">
      {children}
    </div>
  </div>

export default AppBar
