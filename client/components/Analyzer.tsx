import { types } from 'cognitive-services'
import * as React from 'react'
import { MouseEventHandler } from 'react'
import { connect, MapDispatchToPropsObject, MapStateToProps } from 'react-redux'
import { closeResults } from '../actions/analyzer'
import { suggestBad, suggestGood } from '../actions/suggester'
import { Status } from '../constants'
import { RootState } from '../reducers'
import AppBar from './AppBar'
import { Button as AppBarButton } from './AppBar/Button'
import { Loader } from './Loader'

interface AnalyzerStateProps {
  status: Status
  results?: types.ImagePredictionResult
  details?: types.Entity
  suggestionStatus: Status
}

interface AnalyzerDispatchProps {
  closeResults: MouseEventHandler<HTMLButtonElement>
  suggestBad: MouseEventHandler<HTMLButtonElement>
  suggestGood: MouseEventHandler<HTMLButtonElement>
}

type AnalyzerProps = AnalyzerStateProps & AnalyzerDispatchProps

const Analyzer: React.StatelessComponent<AnalyzerProps> = ({
  status,
  results,
  details,
  closeResults,
  suggestBad,
  suggestGood,
  suggestionStatus
}: AnalyzerProps) => {
  switch (status) {
    case Status.Hidden:
      return null
    case Status.Loading:
      return <Loader title="Analyzing" />
    case Status.Ready: {
      // check if any predictions remain
      if (!results!.Predictions.length) {
        return (
          <div>
            <h2>No more possibilities found.</h2>
          </div>
        )
      }

      // grab the prediction result entity
      const entity = details!
      return (
        <div className="analyzer">
          <div className="content">
            <h1 className="content-header">
              {entity.name}
            </h1>
            <img
              src={entity.image.hostPageUrl}
              className={`content-image${suggestionStatus === Status.Loading
                ? ' loading'
                : ''}`}
            />
            <p className="content-description">
              {entity.description}
            </p>
          </div>
          <AppBar>
            <AppBarButton icon="&#xE114;" onClick={closeResults} side="left" />
            {(() => {
              switch (suggestionStatus) {
                case Status.Hidden:
                  return null
                case Status.Loading:
                  return [
                    <AppBarButton
                      icon="&#xE19E;"
                      onClick={suggestBad}
                      disabled
                      side="right"
                    />,
                    <AppBarButton
                      icon="&#xE19F;"
                      onClick={suggestGood}
                      disabled
                      side="right"
                    />
                  ]
                case Status.Ready:
                  return [
                    <AppBarButton
                      icon="&#xE19E;"
                      onClick={suggestBad}
                      side="right"
                    />,
                    <AppBarButton
                      icon="&#xE19F;"
                      onClick={suggestGood}
                      side="right"
                    />
                  ]
                default:
                  throw new Error(`Unhandled Suggester state ${status}`)
              }
            })()}
          </AppBar>
        </div>
      )
    }
    default:
      throw new Error(`Unhandled Analyzer state ${status}`)
  }
}

const mapStateToProps: MapStateToProps<AnalyzerStateProps, {}> = ({
  analyzer: { status, results, details, suggestionStatus }
}: RootState) => ({
  status,
  results,
  details,
  suggestionStatus
})

const mapDispatchToProps: AnalyzerDispatchProps & MapDispatchToPropsObject = {
  closeResults,
  suggestBad,
  suggestGood
}

export default connect(mapStateToProps, mapDispatchToProps)(Analyzer)
