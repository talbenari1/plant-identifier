import { types } from 'cognitive-services'
import { AnyAction, Reducer } from 'redux'
import { Actions, Status } from '../constants'

export interface AnalyzerState {
  status: Status
  results?: types.ImagePredictionResult
  details?: types.Entity
  suggestionStatus: Status
}

const initialState: AnalyzerState = {
  status: Status.Hidden,
  results: undefined,
  details: undefined,
  suggestionStatus: Status.Hidden
}

export const analyzerReducer: Reducer<AnalyzerState> = (
  state = initialState,
  { type, payload }: AnyAction
): AnalyzerState => {
  switch (type) {
    case Actions.LoadResults:
      return { ...state, status: Status.Loading }
    case Actions.SetResults:
      return { ...state, ...payload }
    case Actions.CloseResults:
      return initialState
    case Actions.SetDetails:
      return {
        ...state,
        status: Status.Ready,
        suggestionStatus: Status.Ready,
        ...payload
      }
    case Actions.SendSuggestion:
      return { ...state, suggestionStatus: Status.Loading }
    case Actions.SuggestBad:
      return {
        ...state,
        suggestionStatus:
          state.results!.Predictions.length <= 1 ? Status.Hidden : Status.Loading,
        results: {
          ...state.results!,
          Predictions: state.results!.Predictions.slice(1)
        }
      }
    case Actions.SuggestGood:
      return {
        ...state,
        suggestionStatus: Status.Hidden,
        results: {
          ...state.results!,
          Predictions: [state.results!.Predictions[0]]
        }
      }
    default:
      return state
  }
}
