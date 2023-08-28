import { useEffect, useState } from "react";
import { findManyTimeseries } from "./utils/findManyTimeseries";
import ChartPlotly from "./components/ChartPlotly/ChartPlotly";
import EmbedMap from "./components/EmbedMap/EmbedMap";
import LocationMarker from "./components/LocationMarker/LocationMarker";
import RefreshPlotButton from "./components/RefreshPlotButton";
import ClearMarkersButton from "./components/ClearMarkersButton";
import LatLonMapEventController from "./components/LatLonMapEventController";
import { IMarker, ITimeseries, glaciersDict } from "./types";
import ProgressBarWithTimer from "./components/ProgressBarWithTimer";
import { GlacierListbox } from "./components/GlacierListbox";
//@ts-ignore
import { useBreakpoints } from 'react-breakpoints-hook'


const App = () => {
  let { md }: { md: boolean } = useBreakpoints({
    md: { min: 845, max: 10000 },
  })

  const [mapRef, setMapRef] = useState<any>(null)
  const [markers, setMarkers] = useState<Array<IMarker>>(glaciersDict["Alaska/Yukon"][0].markers)
  const [timeseriesArr, setTimeseriesArr] = useState<Array<ITimeseries>>([])
  const [progress, setProgress] = useState<number>(0)
  const [fetchInProgress, setFetchInProgress] = useState<boolean>(true)
  const [velMosaicChecked, setVelMosaicChecked] = useState(false)

  useEffect(() => {

    findManyTimeseries(markers).catch(err => {
      console.log(err)
      setProgress(0)
    }).then(res => {
      setTimeseriesArr(res || [])
      setFetchInProgress(false)
      setProgress(100)
    })
  }, [])

  return (
    <div className=" max-w-[500px] md:max-w-[1000px] h-[1000px] bg-[#222222] flex flex-col items-center">
      <div className="w-[80%] h-full">

        <div className="w-full h-[40%]">
          <EmbedMap
            velMosaicChecked={velMosaicChecked}
            mapChildren={
              <>
                {markers.map(marker => (
                  <LocationMarker key={`${marker.id}`} markerProp={marker} markers={markers} setMarkers={setMarkers} />
                ))}
                <LatLonMapEventController markers={markers} setMarkers={setMarkers} setVelMosaicChecked={setVelMosaicChecked} />
              </>
            }
            setMap={setMapRef}
          />
        </div>
        <div className="w-full flex flex-row flex-wrap justify-start items-center min-h-min my-5">
          <ProgressBarWithTimer
            numOfMarkers={markers.length}
            disabled={!fetchInProgress}
            setProgress={setProgress}
            progress={progress}
          />

          <RefreshPlotButton
            fetchInProgress={fetchInProgress}
            setFetchInProgress={setFetchInProgress}
            markers={markers}
            setProgress={setProgress}
            setTimeseriesArr={setTimeseriesArr}
          />

          <ClearMarkersButton
            md={md}
            setMarkers={setMarkers}
            setTimeseriesArr={setTimeseriesArr}
          />

          <GlacierListbox
            setMarkers={setMarkers}
            mapRef={mapRef}
            markers={markers}
            setTimeseriesArr={setTimeseriesArr}
            setFetchInProgress={setFetchInProgress}
            setProgress={setProgress}
            setVelMosaicChecked={setVelMosaicChecked}
          />
        </div>
        <div className="w-full h-[40%]">
          <ChartPlotly md={md} timeseriesArr={timeseriesArr} />
        </div>

      </div>
    </div>
  )
};
export default App