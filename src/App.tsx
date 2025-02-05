import { useEffect, useState } from "react";
import PlotlyChart from "./components/PlotlyChart";
import EmbedMap from "./components/EmbedMap/EmbedMap";
import LocationMarker from "./components/LocationMarker/LocationMarker";
import ClearMarkersButton from "./components/ClearMarkersButton";
import MapEventController from "./components/MapEventController";
import { IMarker, ITimeseries, glaciersDict } from "./types";
import { GlacierListbox } from "./components/GlacierListbox";
import { Map as IMap } from "leaflet";
import ExploreMoreButton from "./components/ExploreMoreButton";
import { getTimeseries } from "./getTimeseries/getTimeseries";

const App = () => {
  const [mapRef, setMapRef] = useState<IMap | null>(null);
  const [markers, setMarkers] = useState<Array<IMarker>>(
    glaciersDict["Alaska/Yukon"][0].markers
  );
  const [timeseriesArr, setTimeseriesArr] = useState<Array<ITimeseries>>([]);
  const [velMosaicChecked, setVelMosaicChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // cleanup for race conditions
    let ignore = false;

    // Sync markers with timeseries
    // AKA remove stale timeseries that no longer have markers
    const filteredTimeseries = timeseriesArr.filter(
      (timeseries) => !markers.every((m) => m.id !== timeseries.marker.id)
    );
    setTimeseriesArr(filteredTimeseries.slice());

    const newMarkers = markers.filter((marker) =>
      timeseriesArr.every((timeseries) => timeseries.marker.id !== marker.id)
    );

    if (newMarkers.length > 0) {
      setIsLoading(true);
      newMarkers.map(getTimeseries).map((promise) =>
        promise
          .then((timeseries) => {
            if (ignore) return;
            setTimeseriesArr((arr) => [...arr, timeseries]);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setIsLoading(false);
          })
      );
    }
    return () => {
      ignore = true;
    };
  }, [markers]);

  return (
    <div className="max-w-[1000px] h-[1000px] bg-[#222222] flex flex-col items-center">
      <div className="w-full h-full">
        <div className="w-full h-[39%] md:h-[42%]">
          <EmbedMap
            velMosaicChecked={velMosaicChecked}
            mapChildren={
              <>
                {markers.map((marker) => (
                  <LocationMarker
                    key={`${marker.id}`}
                    markerProp={marker}
                    markers={markers}
                    setMarkers={setMarkers}
                  />
                ))}
                <MapEventController
                  markers={markers}
                  setMarkers={setMarkers}
                  setVelMosaicChecked={setVelMosaicChecked}
                />
              </>
            }
            setMap={setMapRef}
          />
        </div>
        <div className="w-full flex md:flex-row items-center min-h-min !my-5 flex-col">
          <div className="flex flex-row md:justify-start w-1/2 justify-center">
            <div className="!mr-3">
              <ClearMarkersButton
                setMarkers={setMarkers}
                setTimeseriesArr={setTimeseriesArr}
              />
            </div>
          </div>
          <div className="flex flex-row md:justify-end w-1/2 justify-center md:!mt-0 !mt-3">
            <GlacierListbox
              setMarkers={setMarkers}
              mapRef={mapRef}
              markers={markers}
              setTimeseriesArr={setTimeseriesArr}
              setVelMosaicChecked={setVelMosaicChecked}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
        <div className="w-full h-[39%] md:h-[42%]">
          <PlotlyChart isLoading={isLoading} timeseriesArr={timeseriesArr} />
        </div>
        <div className="flex justify-between ">
          <div className="!mt-2">
            <ExploreMoreButton markers={markers} />
          </div>
          <div className="text-sm text-right font-sans text-[#7C7C7C] !mt-1">
            Demo widget created by{" "}
            <a
              className="text-[#00B8D4] no-underline hover:underline"
              target="_blank"
              href="https://www.linkedin.com/in/fahnestockj"
              rel="noreferrer"
            >
              Jacob Fahnestock
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
