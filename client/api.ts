import { types } from 'cognitive-services'
import * as request from 'superagent'

export const predict = async (
  file: Blob
): Promise<types.ImagePredictionResult> =>
  (await request.post('/predict').type('application/octet-stream').send(file))
    .body

export const searchEntity = async (query: string): Promise<types.Entity[]> =>
  (await request.get('/search-entity').query({ query })).body

export const suggest = async (
  id: string,
  tag: string
): Promise<types.CreateImageSummary> =>
  (await request.post('/suggest').send({ id, tag })).body
