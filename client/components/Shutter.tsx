import * as React from 'react'
import { EventHandler, MouseEvent, StatelessComponent } from 'react'

export interface ShutterProps {
  photoAction: EventHandler<MouseEvent<HTMLButtonElement>>
}

const Shutter: StatelessComponent<ShutterProps> = ({ photoAction }) =>
  <button className="camera-controls-shutter" onClick={photoAction}>
    &#xE114;
  </button>

export default Shutter
