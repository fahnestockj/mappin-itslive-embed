import { SetStateAction, useState } from "react";
import ChartPlotly from "./components/ChartPlotly/ChartPlotly";
import EmbedMap from "./components/EmbedMap";
import LocationMarker from "./components/LocationMarker/LocationMarker";
import RefreshPlotButton from "./components/RefreshPlotButton";
import ClearMarkersButton from "./components/ClearMarkersButton";
import LatLonMapEventController from "./components/LatLonMapEventController";
import { markersInit } from "./components/ChartPlotly/mockMarkers";
import { IMarker, ITimeseries } from "./types";
import { malaspinaTimeseriesArr } from "./components/ChartPlotly/mockTimeseries";
import ProgressBarWithTimer from "./components/ProgressBarWithTimer";
import { ListboxTime } from "./components/ListboxTime";
//@ts-ignore
import { useBreakpoints } from 'react-breakpoints-hook'


const App = () => {
  let { md }: { md: boolean } = useBreakpoints({
    md: { min: 845, max: 10000 },
  })

  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<Array<IMarker>>(markersInit)
  const [timeseriesArr, setTimeseriesArr] = useState<Array<ITimeseries>>(malaspinaTimeseriesArr)
  const [progress, setProgress] = useState<number>(0)
  const [fetchInProgress, setFetchInProgress] = useState<boolean>(false)
  const [velMosaicChecked, setVelMosaicChecked] = useState(true)

  return (
    <div className=" max-w-[500px] md:max-w-[1000px] h-[1000px] bg-[#222222]">
      <div className="max-w-[80%] h-full">

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
            setMap={setMap}
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
          />

          <ListboxTime
            setMarkers={setMarkers}
            mapRef={map}
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