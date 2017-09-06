import * as React from 'react'

export interface LoaderProps {
  title: string
}

export const Loader: React.StatelessComponent<LoaderProps> = ({ title }) =>
  <div className="loader">
    <div>
      <h1>
        {title}
      </h1>
      <progress />
    </div>
  </div>

export default Loader
