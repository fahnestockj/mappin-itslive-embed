import { ITimeseries } from "../../types"
import { blueX, blueY, greenX, greenY, redX, redY, yellowX, yellowY } from "./mockData"
import { markersInit } from "./mockMarkers"

export const malaspinaTimeseriesArr: Array<ITimeseries> = [
  // order blue green red yellow
  {
    marker: markersInit[0],
    data: {
      midDateArray: blueX,
      velocityArray: blueY
    }
  },
  {
    marker: markersInit[1],
    data: {
      midDateArray: greenX,
      velocityArray: greenY
    }
  },
  {
    marker: markersInit[2],
    data: {
      midDateArray: redX,
      velocityArray: redY
    }
  },
  {
    marker: markersInit[3],
    data: {
      midDateArray: yellowX,
      velocityArray: yellowY
    }
  },
]
