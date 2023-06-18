import { CRS } from "leaflet";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow
});

interface IProps {
  mapChildren?: React.ReactNode
  center?: [number, number]
  zoom?: number,
}

const EmbedMap = (props: IProps) => {
  const { center, zoom } = props
  return (
    <div className="w-full h-full">
      <div className="w-full h-full m-auto " >
        <MapContainer
          className='h-[100%] cursor-crosshair'
          crs={CRS.EPSG3857}
          center={center || [59.99426, -140.58929]}
          zoom={zoom || 6}
          maxZoom={10}
          minZoom={2}
          scrollWheelZoom={true}
          worldCopyJump={true}
        >
          <LayersControl >
            <TileLayer
              className='cursor-crosshair'
              attribution='Imagery provided by ESRI'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg"
              maxNativeZoom={11}
              tileSize={256}
            />
            <LayersControl.Overlay checked name='Velocity Map'>
              <TileLayer
                className='cursor-crosshair'
                url="https://glacierflow.nyc3.digitaloceanspaces.com/webmaps/vel_map/{z}/{x}/{y}.png"
                maxNativeZoom={11}
                tileSize={256}
              />
            </LayersControl.Overlay>
          </LayersControl>
          {props.mapChildren}
        </MapContainer>
      </div>
    </div>
  )
};

export default EmbedMap;
