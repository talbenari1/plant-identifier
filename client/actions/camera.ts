import { ChangeEvent, EventHandler } from 'react'
import { Dispatch } from 'redux'
import { Actions, Status } from '../constants'
import { RootState } from '../reducers'
import { loadResults } from './analyzer'

export const setCamera = (num: number) => async (
  dispatch: Dispatch<RootState>,
  getState: () => RootState
): Promise<void> => {
  // tell the app that we're about to load a video feed
  dispatch({
    type: Actions.LoadCamera
  })

  // get the ID of the camera we want to load
  const constraints: MediaStreamConstraints = {
    video: { deviceId: { exact: getState().camera.devices[num].deviceId } }
  }

  // get the camera feed
  const stream = await navigator.mediaDevices.getUserMedia(constraints)

  // update the camera info in the app state
  dispatch({
    type: Actions.SetCamera,
    payload: {
      src: window.URL.createObjectURL(stream),
      num
    }
  })
}

export const initializeCameras = () => async (
  dispatch: Dispatch<RootState>
): Promise<void> => {
  // make sure the browser supports the mediaDevices protocol
  if (!navigator.mediaDevices) {
    dispatch({
      type: Actions.SetCameraInfo,
      payload: {
        status: Status.Unsupported
      }
    })
  } else {
    // get all available video input devices
    const devices: MediaDeviceInfo[] = (await navigator.mediaDevices.enumerateDevices()).filter(
      (device: MediaDeviceInfo) => device.kind === 'videoinput'
    )

    // update general camera info
    dispatch({
      type: Actions.SetCameraInfo,
      payload: {
        devices
      }
    })

    // use the first available camera as the default device
    void dispatch(setCamera(0))
  }
}

export const takePhoto = (
  camera: HTMLVideoElement,
  canvas: HTMLCanvasElement
) => (dispatch: Dispatch<RootState>, getState: () => RootState): void => {
  // make sure the camera is ready to take a picture
  if (getState().camera.status !== Status.Ready) {
    throw new Error(`Cannot take photo when camera isn't ready`)
  }

  // resize the canvas and grab the canvas context
  canvas.width = camera.videoWidth
  canvas.height = camera.videoHeight
  const context = canvas.getContext('2d')

  // ensure that the canvas context was initialized
  if (!context) {
    throw new Error('Failed to initialize canvas context')
  }

  // take the photo
  context.drawImage(camera, 0, 0, canvas.width, canvas.height)
  
  // make sure the browser has a canvas.toBlob method
  if (!canvas.toBlob && canvas.msToBlob) {
    // grab the binary data and store the photo in the store
    dispatch({
      type: Actions.TakePhoto,
      payload: {
        photo: canvas.msToBlob()
      }
    })
    
    // send the photo to be analyzed
    void dispatch(loadResults())
  } else {
    // grab the binary data and store the photo in the store
    canvas.toBlob(photo => {
      dispatch({
        type: Actions.TakePhoto,
        payload: {
          photo
        }
      })
  
      // send the photo to be analyzed
      void dispatch(loadResults())
    })
  }
}

export const uploadFile: EventHandler<ChangeEvent<HTMLInputElement>> = ({
  target: { files }
}) => async (
  dispatch: Dispatch<RootState>,
  getState: () => RootState
): Promise<void> => {
  if (!files) {
    throw new Error('Cannot upload file when none was given')
  }

  if (files.length > 1) {
    throw new Error('Cannot upload more than one file at a time')
  }

  // make sure the camera is ready to take a picture
  if (
    getState().camera.status === Status.Loading ||
    getState().camera.status === Status.Uninitialized
  ) {
    throw new Error(`Cannot take photo when camera isn't ready`)
  }

  // store the photo in the store
  dispatch({
    type: Actions.TakePhoto,
    payload: {
      photo: files[0]
    }
  })

  // send the photo to be analyzed
  void dispatch(loadResults())
}
