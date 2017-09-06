import * as React from 'react'
import { connect, MapDispatchToPropsObject, MapStateToProps } from 'react-redux'
import { setCamera } from '../actions/camera'
import { RootState } from '../reducers'

interface SwitchStateProps {
  num: number
  devices: MediaDeviceInfo[]
}

interface SwitchDispatchProps {
  setCamera: (num: number) => void
}

type SwitchProps = SwitchStateProps & SwitchDispatchProps

const Switch: React.StatelessComponent<SwitchProps> = ({
  num,
  devices,
  setCamera
}) => {
  const classes =
    'camera-controls-button camera-controls-switch ' +
    (devices.length > 1 ? 'camera-controls-switch--visible' : '')

  const nextCamera: () => void = () =>
    devices.length > 1 && setCamera((num + 1) % devices.length)

  return (
    <button className={classes} onClick={nextCamera}>
      &#xE124;
    </button>
  )
}

const mapStateToProps: MapStateToProps<SwitchStateProps, {}> = ({
  camera: { num, devices }
}: RootState) => ({ num, devices })

const mapDispatchToProps: SwitchDispatchProps & MapDispatchToPropsObject = {
  setCamera
}

export default connect(mapStateToProps, mapDispatchToProps)(Switch)
