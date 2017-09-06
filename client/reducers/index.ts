// import { routerReducer as routing } from 'react-router-redux'
import { ReducersMapObject } from 'redux'
import { analyzerReducer as analyzer, AnalyzerState } from './analyzer'
import { cameraReducer as camera, CameraState } from './camera'

export interface RootState {
  analyzer: AnalyzerState
  camera: CameraState
}

export const reducers: ReducersMapObject = { analyzer, camera }
