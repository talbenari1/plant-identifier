import { AnyAction, Reducer } from 'redux'
import { Actions, Status } from '../constants'

export interface CameraState {
  status: Status
  src?: string
  devices: MediaDeviceInfo[]
  num: number
  photo?: Blob
}

const initialState: CameraState = {
  status: Status.Uninitialized, // the camera status
  src: undefined, // the camera feed's stream URL
  devices: [], // the available camera feeds
  num: 0, // which of the devices is being used (index into devices)
  photo: undefined // the most recent photo taken by the camera
}

export const cameraReducer: Reducer<CameraState> = (
  state = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case Actions.LoadCamera:
      return { ...state, status: Status.Loading }
    case Actions.SetCameraInfo:
      return { ...state, ...payload }
    case Actions.SetCamera:
      return { ...state, ...payload, status: Status.Ready }
    case Actions.TakePhoto:
      return { ...state, ...payload }
    case Actions.LoadResults:
      return { ...state, status: Status.Hidden }
    case Actions.CloseResults:
      return { ...state, status: Status.Ready }
    default:
      return state
  }
}
