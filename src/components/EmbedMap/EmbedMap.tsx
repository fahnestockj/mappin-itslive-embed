import { CRS } from "leaflet";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import './leaflet.css';
import { useMemo } from "react";
import { Map as IMap } from "leaflet";

interface IProps {
  mapChildren?: React.ReactNode
  setMap: React.Dispatch<React.SetStateAction<IMap | null>>
  velMosaicChecked: boolean
}

const EmbedMap = (props: IProps) => {
  const { setMap, velMosaicChecked } = props
  //Make center zoom and layers external state
  const center = { lat: 59.99426, lng: -140.58929 }
  const zoom = 9


  const displayMap = useMemo(
    () => (
      <div className="w-full h-full">
        <div className="w-full h-full m-auto " >
          <MapContainer
            className='h-[100%] cursor-crosshair'
            crs={CRS.EPSG3857}
            center={center}
            zoom={zoom}
            maxZoom={15}
            minZoom={2}
            scrollWheelZoom={false}
            worldCopyJump={true}
            //@ts-ignore
            ref={setMap}
          >
            <LayersControl>
              <TileLayer
                className='cursor-crosshair'
                attribution='Imagery provided by ESRI'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg"
                maxNativeZoom={15}
                tileSize={256}
              />
              <LayersControl.Overlay checked={velMosaicChecked} name='Velocity Map'>
                <TileLayer
                  className='cursor-crosshair !opacity-50'
                  url="https://glacierflow.nyc3.digitaloceanspaces.com/webmaps/vel_map/{z}/{x}/{y}.png"
                  maxNativeZoom={15}
                  tileSize={256}
                />
              </LayersControl.Overlay>
            </LayersControl>
            {props.mapChildren}
          </MapContainer>
        </div>
      </div>
    ), [props.mapChildren, velMosaicChecked])

  return (
    <>
      {displayMap}
    </>
  )
};

export default EmbedMap;
