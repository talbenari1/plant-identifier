import { Dispatch } from 'redux'
import { suggest } from '../api'
import { Actions } from '../constants'
import { RootState } from '../reducers'
import { getPlantEntity } from './analyzer'

export const suggestBad = () => async (
  dispatch: Dispatch<RootState>,
  getState: () => RootState
): Promise<void> => {
  // set the suggester to a loading status
  dispatch({ type: Actions.SendSuggestion })

  // finish the suggestion
  dispatch({ type: Actions.SuggestBad })

  // get the details of the most probable prediction
  await dispatch(getPlantEntity(getState().analyzer.results!.Predictions[0].Tag))
}

export const suggestGood = () => async (
  dispatch: Dispatch<RootState>,
  getState: () => RootState
): Promise<void> => {
  const { Id: id, Predictions: [{ TagId: tag }] } = getState().analyzer.results!
  dispatch({ type: Actions.SendSuggestion })

  dispatch({
    type: Actions.SuggestGood,
    payload: {
      summary: await suggest(id, tag)
    }
  })
}
