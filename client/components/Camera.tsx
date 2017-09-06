import { Loader } from './Loader';
import * as React from 'react';
import { Component } from 'react'
import { connect, MapDispatchToPropsObject, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import { initializeCameras, takePhoto } from '../actions/camera'
import { Status } from '../constants'
import { RootState } from '../reducers'
import CameraControls from './CameraControls'
import FileUpload from './FileUpload'

export interface CameraStateProps {
  status: Status
  src?: string
}

export interface CameraDispatchProps {
  takePhoto: (camera: HTMLVideoElement, canvas: HTMLCanvasElement) => void
  initializeCameras: <S>() => (dispatch: Dispatch<S>) => Promise<void>
}

export type CameraProps = CameraStateProps & CameraDispatchProps

class Camera extends Component<CameraProps, {}> {
  private canvas: HTMLCanvasElement | null
  private camera: HTMLVideoElement | null

  componentDidMount() {
    if (this.props.status === Status.Uninitialized) {
      this.props.initializeCameras()
    }
  }

  render() {
    switch (this.props.status) {
      case Status.Unsupported:
        return (
          <div className="image-upload">
            <h1>Upload your image</h1>
            <FileUpload />
          </div>
        )
      case Status.Uninitialized:
        return <Loader title="Initializing"/>
      case Status.Loading:
        return <Loader title="Loading" />
      case Status.Ready:
        return (
          <div className="camera">
            <video
              autoPlay
              className="camera-feed"
              src={this.props.src}
              ref={camera => {
                this.camera = camera
              }}
            />
            <canvas
              className="camera-photo"
              ref={canvas => {
                this.canvas = canvas
              }}
            />
            <CameraControls
              photoAction={() =>
                this.props.takePhoto(this.camera!, this.canvas!)}
            />
          </div>
        )
      case Status.Hidden:
        return null
      default:
        throw new Error(`Unhandled camera status ${this.props.status}`)
    }
  }
}

const mapStateToProps: MapStateToProps<CameraStateProps, {}> = ({
  camera: { status, src }
}: RootState) => ({ status, src })

const mapDispatchToProps: CameraDispatchProps & MapDispatchToPropsObject = {
  initializeCameras,
  takePhoto
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
