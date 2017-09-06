import { Bing, CustomVision, types } from 'cognitive-services'
import { shuffle } from 'lodash'
import { promisify } from 'util'
import config from './config'

const { BING_LIMIT } = Bing
const { trainer } = new CustomVision({
  trainingKey: config.trainingKey,
  predictionKey: config.predictionKey,
  projectID: config.projectID
})
const { images } = new Bing({ APIKey: config.APIKey })
const DEBUG: boolean = !!process.env.DEBUG

// sleep an async control flow for a specified time (in milliseconds)
const timeOut: (timeout: number) => Promise<any> = promisify(setTimeout) as any

// used for debug statements
const debug = (...args: any[]) => DEBUG && console.log(...args) // tslint:disable-line no-console

// initialize a project from a set of queries
const initializeFromQueries = async (queries: string[]): Promise<void> => {
  // get the list of tags currently in use
  const { Tags: tags }: types.ImageTagList = await trainer!.getTags()

  debug('Retrieved project tags')

  // the number of blocks into which to separate the requests
  // this is needed in order to remain within the Bing API's free tier
  const NUM_BLOCKS = Math.ceil(queries.length / BING_LIMIT)

  for (let i = 0; i < NUM_BLOCKS - 1; i++) {
    // grab the queries for this request block
    const block = queries.splice(0, BING_LIMIT)

    // generate the async requests for each query
    const promises = block.map<Promise<types.CreateImageSummary>>(async q => {
      // either find an existing tag for the query or create a new one
      const { Id: id } =
        tags.find((t: types.ImageTag) => t.Name === q) ||
        (await trainer!.createTag(q))
      debug('Created tag for', q)

      // search Bing for images of this query
      const imageURLs = (await images.search(q, 15)).value.map(
        (res: types.Image) => res.contentUrl
      )
      debug('Fetched images for', q)

      // add the images to Custom Vision
      const results = await trainer!.addImages(imageURLs, [id])
      debug('Added images to training data for', q)
      return results
    })

    // add a 1 second timer to the set of requests
    promises.push(timeOut(1000))
    debug(`Generated promises for block ${i + 1} of ${NUM_BLOCKS + 1}`)

    // require all requests (and the timer) to finish before continuing
    await Promise.all(promises)

    debug(`Finished adding block ${i + 1} of ${NUM_BLOCKS + 1}`)
  }

  debug('Initialization complete.')
}

// the list of plants (scientific names)
const plants = [
  'Abies amabilis',
  'Abies concolor',
  'Abies grandis',
  'Abies lasiocarpa',
  'Abies procera',
  'Acer circinatum',
  'Acer glabrum',
  'Acer grandidentatum',
  'Acer macrophyllum',
  'Achillea millefolium',
  'Achlys triphylla',
  'Adiantum aleuticum',
  'Aesculus californica',
  'Allium acuminatum',
  'Allium cernuum',
  'Alnus rhombifolia',
  'Alnus rubra',
  'Alnus viridis',
  'Amelanchier alnifolia',
  'Anaphalis margaritacea',
  'Andromeda polifolia',
  'Aquilegia formosa',
  'Aralia californica',
  'Arbutus menziesii',
  'Arctostaphylos columbiana',
  'Arctostaphylos patula',
  'Arctostaphylos uva-ursi',
  'Aruncus dioicus',
  'Asarum caudatum',
  'Athyrium filix-femina',
  'Baccharis pilularis',
  'Betula glandulosa',
  'Betula neoalaskana',
  'Betula occidentalis',
  'Betula papyrifera',
  'Blechnum spicant',
  'Calocedrus decurrens',
  'Calochortus uniflorus',
  'Camassia leichtlinii',
  'Camassia quamash',
  'Carex densa',
  'Carex obnupta',
  'Ceanothus cuneatus',
  'Ceanothus integerrimus',
  'Ceanothus prostratus',
  'Ceanothus sanguineus',
  'Ceanothus thrysiflorus',
  'Ceanothus velutinus',
  'Cercis occidentalis',
  'Cercocarpus betuloides',
  'Cercocarpus ledifolius',
  'Chamaecyparis lawsoniana',
  'Chamaecyparis nootkatensis',
  'Chamerion angustifolium',
  'Chrysolepis chrysophylla',
  'Clematis ligusticifolia',
  'Cornus nuttallii',
  'Cornus sericea',
  'Cornus sericea',
  'Cornus sessilis',
  'Cornus unalaschkensis',
  'Corylus cornuta',
  'Crataegus douglasii',
  'Cupressus bakeri',
  'Cynoglossum grande',
  'Delphinium trollifolium',
  'Dicentra formosa',
  'Dichelostemma congestum',
  'Dodecatheon hendersonii',
  'Dryopteris arguta',
  'Eleocharis palustris or eleocharis macrostachyas',
  'Erythronium grandiflorum',
  'Erythronium oreganum',
  'Erythronium revolutum',
  'Fragaria chiloensis',
  'Fragaria vesca',
  'Fragaria virginiana',
  'Fraxinus latifolia',
  'Fritillaria affinis',
  'Fritillaria camaschatcensis',
  'Fritillaria pudica',
  'Gaillardia arista',
  'Garrya elliptica',
  'Garrya fremontii',
  'Gaultheria shallon',
  'Geum macrophyllum',
  'Ginko biloba',
  'Goodyera oblongifolia',
  'Heracleum lanatum',
  'Holodiscus discolor',
  'Hydrophyllum tenuipes',
  'Iris chrysophylla',
  'Iris douglasiana',
  'Iris missouriensis',
  'Iris purdyi',
  'Iris setosa',
  'Iris tenax',
  'Juncus effusus',
  'Juncus ensifolius',
  'Juniperus communis',
  'Juniperus scopulorum',
  'Larix lyallii',
  'Ledum glandulosum [Rhododendron neoglandulosum]',
  'Lewisia columbiana',
  'Lewisia columbiana',
  'Lewisia cotyledon',
  'Lewisia leeana',
  'Lilium bolanderi',
  'Lilium columbianum',
  'Lilium kelloggii',
  'Lilium occidentale',
  'Lilium pardalinum',
  'Lilium pardalinum',
  'Lilium pardalinum',
  'Lilium parryi',
  'Lilium parvum',
  'Lilium washingtonianum',
  'Lilium washingtonianum',
  'Linnaea borealis',
  'Lithocarpus densiflorus',
  'Lonicera ciliosa',
  'Lonicera hispidula',
  'Lonicera involucrata',
  'Lupinus rivularis',
  'Lysicitum americanus',
  'Mahonia [Berberis] aquifolium',
  'Mahonia [Berberis] nervosa',
  'Mahonia [Berberis] repens',
  'Maianthemum dilatatum',
  'Maianthemum racemosum',
  'Maianthemum stellatum',
  'Malus fusca',
  'Metasequoia glyptostroboides',
  'Mimulus guttatus',
  'Myosotis alpestris',
  'Myrica californica',
  'Myrica gale',
  'Oemleria cerasiformis',
  'Oenthera elata',
  'Olsynium douglasii',
  'Oplopanax horridus',
  'Oxalis oregana',
  'Paxistima myrsinites',
  'Penstemon serrulatus',
  'Philadelphus lewisii',
  'Physocarpus capitatus',
  'Physocarpus malvaceus',
  'Picea breweriana',
  'Picea engelmannii',
  'Picea sitchensis',
  'Pinus aristata',
  'Pinus contorta',
  'Pinus contorta',
  'Pinus monticola',
  'Pinus ponderosa',
  'Pinus sabiniana',
  'Polypodium glycyrrhiza',
  'Polystichum munitum',
  'Populus tremuloides',
  'Populus trichocarpa',
  'Potentilla fruticosa',
  'Prosartes hookeri',
  'Prosartes smithii',
  'Prunella vulgaris',
  'Prunus americana',
  'Prunus emarginata',
  'Prunus subcordata',
  'Prunus virginiana',
  'Pseudotsuga menziesii',
  'Quercus chrysolepis',
  'Quercus garryana',
  'Quercus kelloggii',
  'Quercus sadleriana',
  'Quercus vaccinifolia',
  'Rhamnus purshiana',
  'Rhododendron albiflorum',
  'Rhododendron macrophyllum',
  'Rhododendron occidentale',
  'Rhus glabra',
  'Rhus trilobata',
  'Ribes aureum',
  'Ribes cereum',
  'Ribes divaricatum',
  'Ribes menziesii',
  'Ribes sanguineum',
  'Rosa gymnocarpa',
  'Rosa nutkana',
  'Rosa pisocarpa',
  'Rosa woodsii',
  'Rubus leucodermis',
  'Rubus parviflorus',
  'Rubus spectabilis',
  'Rubus ursinus',
  'Sagittaria latifolia',
  'Salix hookeriana',
  'Salix lasiolepis',
  'Salix lucida',
  'Salix scouleriana',
  'Salix sitchensis',
  'Sambucus mexicana',
  'Sambucus racemosa',
  'Scirpus microcarpus',
  'Sedum oreganum',
  'Sedum spathulifolium',
  'Sequoia sempervirens',
  'Sequoiadendron giganteum',
  'Sidalcea cusickii',
  'Sidalcea nelsoniana',
  'Sidalcea virgata',
  'Sisyrinchium bellum',
  'Sisyrinchium californicum',
  'Solidago canadensis',
  'Sorbus scopulina',
  'Sorbus sitchensis',
  'Spiraea betulifolia',
  'Spiraea douglasii',
  'Spiraea splendens',
  'Symphoricarpos albus',
  'Symphoricarpos occidentalis',
  'Symphyotrichum chilense',
  'Symphyotrichum subspicatum',
  'Synthyris reniformis',
  'Tellima grandiflora',
  'Thuja plicata',
  'Tolmiea menziesii',
  'Trillium kurabayashii',
  'Trillium ovatum',
  'Trillium parviflorum',
  'Triteleia hyacinthina',
  'Tsuga heterophylla',
  'Tsuga mertensiana',
  'Typha latifolia',
  'Umbellularia californica',
  'Vaccinium caespitosum',
  'Vaccinium membranaceum',
  'Vaccinium ovalifolium',
  'Vaccinium ovatum',
  'Vaccinium parvifolium',
  'Vaccinium scoparium',
  'Vancouveria hexandra',
  'Veratrum viride',
  'Viburnum edule',
  'Viburnum ellipticum',
  'Viburnum opulus',
  'Viola adunca',
  'Viola glabella',
  'Viola sempervirens',
  'Vitis californica',
  'Xerophyllum tenax'
]

// custom vision only allows 50 tags
void initializeFromQueries(shuffle(plants).slice(1, 51))
