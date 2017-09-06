import * as React from 'react'
import { MouseEventHandler, StatelessComponent } from 'react'
import { connect, MapDispatchToPropsObject, MapStateToProps } from 'react-redux'
import { suggestBad, suggestGood } from '../actions/suggester'
import { Status } from '../constants'
import { RootState } from '../reducers'
import { formatPercent } from '../utils'

interface SuggesterStateProps {
  status: Status
  confidence: number
}

interface SuggesterDispatchProps {
  suggestBad: MouseEventHandler<HTMLButtonElement>
  suggestGood: MouseEventHandler<HTMLButtonElement>
}

type SuggesterProps = SuggesterStateProps & SuggesterDispatchProps

export const Suggester: StatelessComponent<SuggesterProps> = ({
  status,
  suggestBad,
  suggestGood,
  confidence
}) => {
  switch (status) {
    case Status.Hidden:
      return null
    case Status.Loading:
      return <h2>Improving results...</h2>
    case Status.Ready:
      return (
        <div>
          <h2>
            Confidence: {formatPercent(confidence)}
          </h2>
          <button className="suggester-button" onClick={suggestBad}>
            &#xE19E;
          </button>
          <button className="suggester-button" onClick={suggestGood}>
            &#xE19F;
          </button>
        </div>
      )
    default:
      throw new Error(`Unhandled Suggester state ${status}`)
  }
}
const mapStateToProps: MapStateToProps<SuggesterStateProps, {}> = ({
  analyzer: { suggestionStatus, results }
}: RootState) => ({
  status: suggestionStatus,
  confidence: results!.Predictions[0].Probability
})

const mapDispatchToProps: SuggesterDispatchProps & MapDispatchToPropsObject = {
  suggestBad,
  suggestGood
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggester)
