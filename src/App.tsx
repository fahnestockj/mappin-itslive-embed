import ChartPlotly from "./components/ChartPlotly/ChartPlotly";
import EmbedMap from "./components/EmbedMap";
import LocationMarker from "./components/LocationMarker/LocationMarker";
import { IMarker } from "./components/Velmap";


const App = () => {
  // 60.10521, -140.44922 b
  // 60.02227, -140.54398 g
  // 59.91642, -140.64697 r
  // 59.83301, -140.78156 y
  const markers: Array<IMarker> = [
    {
      id: 'b',
      color: 'blue',
      latLng: {
        lat: 60.10521,
        lng: -140.44922
      }
    },
    {
      id: 'g',
      color: 'green',
      latLng: {
        lat: 60.02227,
        lng: -140.54398
      }
    },
    {
      id: 'r',
      color: 'red',
      latLng: {
        lat: 59.91642,
        lng: -140.64697
      }
    },
    {
      id: 'y',
      color: 'yellow',
      latLng: {
        lat: 59.83301,
        lng: -140.78156
      }
    }
  ]

  
  return (
    <div className="w-[1000px] h-[1000px]">
      <div className="w-full h-1/2">
        <EmbedMap 
          zoom={9}
          mapChildren={
            <>
              {markers.map(marker => (
                <LocationMarker key={`${marker.id}`} markerProp={marker} markers={markers} draggable={false} />
              ))}
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