import { useState } from "react";
import ChartPlotly from "./components/ChartPlotly/ChartPlotly";
import EmbedMap from "./components/EmbedMap";
import LocationMarker from "./components/LocationMarker/LocationMarker";
import RefreshPlotButton from "./components/RefreshPlotButton";
import ClearMarkersButton from "./components/ClearMarkersButton";
import LatLonMapEventController from "./components/LatLonMapEventController";
import { markersInit } from "./components/ChartPlotly/mockMarkers";
import { IMarker } from "./types";

const App = () => {

  const [markers, setMarkers] = useState<Array<IMarker>>(markersInit)

  return (
    <div className="w-[1000px] h-[1000px] bg-[#222222]">
      <div className="flex flex-row justify-start items-center">
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
        <ChartPlotly timeseriesArr={[]}/>
      </div>
    </div>
  )
};
export default App