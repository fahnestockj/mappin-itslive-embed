import { CRS } from "leaflet";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";

interface IProps {
  mapChildren?: React.ReactNode
  center?: [number, number]
  zoom?: number,
}

const EmbedMap = (props: IProps) => {
  const { center, zoom } = props
  return (
    <div className="w-full h-full">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin="" />
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossOrigin="" />

      <div className="w-full h-full m-auto " >
        <MapContainer className='h-[100%] cursor-crosshair' crs={CRS.EPSG3857} center={center || [59.99426, -140.58929]} zoom={zoom || 6} maxZoom={10} minZoom={2} scrollWheelZoom={true}  >
          <LayersControl >
            <TileLayer
              className='cursor-crosshair'
              attribution='Imagery provided by ESRI'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg"
              maxNativeZoom={11}
              tileSize={256}
            />
            <LayersControl.Overlay checked name='Velocity Map'> <TileLayer
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
