import { describe, it, expect } from 'vitest'
import { geoJsonLookup } from "./geoJsonLookup"
import { IMarker } from '../types'

describe('geoJsonLookup', () => {

  it('finds the correct datacube for a given latitude longitude', () => {
    const marker: IMarker = {
      latLon: {
        lat: 70,
        lon: -50,
      },
      id: 'test',
      color: 'red',
    }
    const res = geoJsonLookup([marker])
    expect(res[0].zarrUrl).toEqual('http://its-live-data.s3.amazonaws.com/datacubes/v02/N70W040/ITS_LIVE_vel_EPSG3413_G0120_X-150000_Y-2150000.zarr')

  })

  it('should fail if we input an incorrect latitude longitude', () => {
    const marker: IMarker = {
      latLon: {
        lat: 2000,
        lon: -2000,
      },
      id: 'test',
      color: 'red',
    }

    const err = new Error("No features found or more than one feature found")
    const callbackFunction = () => { geoJsonLookup([marker]) }
    expect(callbackFunction).toThrow(err)
  })

  it('can handle a marker that changes datacubes after converting projections', () => {
    const marker: IMarker = {
      latLon: {
        lat: 70.78328,
        lon: -43.90137
      },
      color: 'blue',
      id: 'test'
    }
    const res = geoJsonLookup([marker])
    expect(res[0].zarrUrl).toEqual('http://its-live-data.s3.amazonaws.com/datacubes/v02/N70W040/ITS_LIVE_vel_EPSG3413_G0120_X50000_Y-2150000.zarr')

  })


})
