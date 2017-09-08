/**
 * The server's REST API endpoints.
 */

import { Bing, CustomVision } from 'cognitive-services'
import { Application } from 'express'
import config from '../config'

const { predictor, trainer } = new CustomVision({
  predictionKey: config.predictionKey,
  trainingKey: config.trainingKey,
  projectID: config.projectID
})

const { entities } = new Bing({ APIKey: config.APIKey })

export default (app: Application) => {
  app.post('/predict', async (req, res) => {
    res.send(await predictor!.predict(req.body as Buffer))
  })

  app.get('/search-entity', async (req, res) => {
    const { entities: entityAnswer } = (await entities.search(req.query.query, 1))
    if (!entityAnswer) throw new Error('No entities found for search query!')

    res.send(entityAnswer.value)
  })

  app.post('/suggest', async (req, res) => {
    const { id, tag } = req.body
    res.send(await trainer!.addPredictionImages([id], [tag]))
  })
}
