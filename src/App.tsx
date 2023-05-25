import { useState } from "react";
import ChartPlotly from "./components/ChartPlotly/ChartPlotly";
import EmbedMap from "./components/EmbedMap";
import LocationMarker from "./components/LocationMarker/LocationMarker";
import { IMarker } from "./components/Velmap";
import RefreshPlotButton from "./components/RefreshPlotButton";
import ClearMarkersButton from "./components/ClearMarkersButton";
import LatLonMapEventController from "./components/LatLonMapEventController";


const App = () => {

  const markersInit: Array<IMarker> = [
    {
      id: 'b',
      color: 'blue',
      latLon: {
        lat: 60.10521,
        lon: -140.44922
      }
    },
    {
      id: 'g',
      color: 'green',
      latLon: {
        lat: 60.02227,
        lon: -140.54398
      }
    },
    {
      id: 'r',
      color: 'red',
      latLon: {
        lat: 59.91642,
        lon: -140.64697
      }
    },
    {
      id: 'y',
      color: 'yellow',
      latLon: {
        lat: 59.83301,
        lon: -140.78156
      }
    }
  ]

  const [markers, setMarkers] = useState<Array<IMarker>>(markersInit)

  return (
    <div className="w-[1000px] h-[1000px] bg-slate-800">
      <div className="flex flex-row justify-start items-center">
        <RefreshPlotButton />
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
        <ChartPlotly />
      </div>
    </div>
  )
};
export default App