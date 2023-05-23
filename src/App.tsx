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

  
  return (
    <div className="w-[1000px] h-[1000px]">
      <div className="w-full h-1/2">
        <EmbedMap 
          zoom={9}
          mapChildren={
            <>
              {markers.map(marker => (
                <LocationMarker key={`${marker.id}`} markerProp={marker} markers={markers} draggable={true} />
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