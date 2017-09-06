import * as React from 'react'
import Switch from './CameraSwitch'
import Upload from './FileUpload'
import Shutter from './Shutter'

export interface CameraControlsProps {
  photoAction: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
}

export const CameraControls: React.StatelessComponent<CameraControlsProps> = ({
  photoAction
}) =>
  <div className="camera-controls">
    <Switch />
    <Shutter photoAction={photoAction} />
    <Upload />
  </div>

export default CameraControls
