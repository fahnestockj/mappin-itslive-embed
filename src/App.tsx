import { useState } from "react";
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

/**
 * TODO: resolve this
 * how are we going to know when were fetching timeseries data?
 * because we need to stop subsequent fetches until the first one is done
 * 
 * flag? fetchInProgress? that disables the fetch button? 
 */


const App = () => {

  const [markers, setMarkers] = useState<Array<IMarker>>(markersInit)
  const [timeseriesArr, setTimeseriesArr] = useState<Array<ITimeseries>>(malaspinaTimeseriesArr)
  const [progress, setProgress] = useState<number>(0)
  const [fetchInProgress, setFetchInProgress] = useState<boolean>(false)
  return (
    <div className="w-[1000px] h-[1000px] bg-[#222222]">
      <div className="flex flex-row justify-start items-center">
        <ProgressBarWithTimer numOfMarkers={markers.length} disabled={!fetchInProgress} setProgress={setProgress} progress={progress} />
        <RefreshPlotButton disabled={markers === markersInit} />
        <ClearMarkersButton setMarkers={setMarkers} />
      </div>
      <div className="w-full h-1/2">
        <EmbedMap
          zoom={9}
          mapChildren={
            <>
              {markers.map(marker => (
                <LocationMarker key={`${marker.id}`} markerProp={marker} markers={markers} setMarkers={setMarkers} />
              ))}
              <LatLonMapEventController markers={markers} setMarkers={setMarkers} />
            </>
          }
        />
      </div>
      <div className="w-full h-1/2">
        <ChartPlotly timeseriesArr={timeseriesArr} setTimeseriesArr={setTimeseriesArr} markers={markers} />
      </div>
    </div>
  )
};
export default App