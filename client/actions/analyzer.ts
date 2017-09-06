import { Dispatch } from 'redux'
import { predict, searchEntity } from '../api'
import { Actions } from '../constants'
import { RootState } from '../reducers'

export const getPlantEntity = (query: string) => async (
  dispatch: Dispatch<RootState>
): Promise<void> => {
  dispatch({
    type: Actions.SetDetails,
    payload: { details: (await searchEntity(query))[0] }
  })
}

export const loadResults = () => async (
  dispatch: Dispatch<RootState>,
  getState: () => RootState
): Promise<void> => {
  const photo = getState().camera.photo

  // make sure the photo exists
  if (!photo) {
    throw new Error('Cannot run predictions without a photo')
  }

  // tell the application that we're loading
  dispatch({ type: Actions.LoadResults })

  // send the image to the predictor and get the results
  const results = await predict(photo)

  dispatch({
    type: Actions.SetResults,
    payload: { results }
  })

  void dispatch(getPlantEntity(results.Predictions[0].Tag))
}

export const closeResults = () => ({ type: Actions.CloseResults })
