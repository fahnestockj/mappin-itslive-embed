import { useEffect, useState } from "react";
import { findManyTimeseries } from "./utils/findManyTimeseries/findManyTimeseries";
import PlotlyChart from "./components/PlotlyChart";
import EmbedMap from "./components/EmbedMap/EmbedMap";
import LocationMarker from "./components/LocationMarker/LocationMarker";
import RefreshPlotButton from "./components/RefreshPlotButton";
import ClearMarkersButton from "./components/ClearMarkersButton";
import MapEventController from "./components/MapEventController";
import { IMarker, ITimeseries, glaciersDict } from "./types";
import ProgressBarWithTimer from "./components/ProgressBarWithTimer";
import { GlacierListbox } from "./components/GlacierListbox";
import SeeMoreButton from "./components/SeeMoreButton";
import { Map as IMap } from "leaflet";

const App = () => {

  const [mapRef, setMapRef] = useState<IMap | null>(null);
  const [markers, setMarkers] = useState<Array<IMarker>>(
    glaciersDict["Alaska/Yukon"][0].markers
  );
  const [timeseriesArr, setTimeseriesArr] = useState<Array<ITimeseries>>([]);
  const [progress, setProgress] = useState<number>(0);
  const [fetchInProgress, setFetchInProgress] = useState<boolean>(true);
  const [velMosaicChecked, setVelMosaicChecked] = useState(false);

  useEffect(() => {
    findManyTimeseries(markers)
      .catch((err) => {
        console.log(err);
        setProgress(0);
      })
      .then((res) => {
        setTimeseriesArr(res || []);
        setFetchInProgress(false);
        setProgress(100);
      });
  }, []);

  return (
    <div className="max-w-[1000px] h-[1000px] bg-[#222222] flex flex-col items-center">
      <div className="w-full h-full">
        <div className="w-full h-[44%]">
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
              <RefreshPlotButton
                fetchInProgress={fetchInProgress}
                setFetchInProgress={setFetchInProgress}
                markers={markers}
                setProgress={setProgress}
                setTimeseriesArr={setTimeseriesArr}
              />
            </div>
            <div className="!mr-3">
              <ClearMarkersButton
                setMarkers={setMarkers}
                setTimeseriesArr={setTimeseriesArr}
              />
            </div>
          </div>
          <div className="flex flex-row md:justify-end w-1/2 justify-center md:!mt-0 !mt-3">
            <div className="!mr-3">
              <SeeMoreButton markers={markers} />
            </div>
            <GlacierListbox
              setMarkers={setMarkers}
              mapRef={mapRef}
              markers={markers}
              setTimeseriesArr={setTimeseriesArr}
              setFetchInProgress={setFetchInProgress}
              setProgress={setProgress}
              setVelMosaicChecked={setVelMosaicChecked}
            />
          </div>
        </div>
        <div className="w-full h-[44%]">
          <PlotlyChart timeseriesArr={timeseriesArr} />
        </div>
        <div className="text-sm text-right font-sans text-[#7C7C7C] !mt-1">
          Demo widget created by <a className="text-[#00B8D4] no-underline hover:underline" target="_blank" href="https:www.linkedin.com/in/fahnestockj" rel="noreferrer">Jacob Fahnestock</a>
        </div>
      </div>

      <ProgressBarWithTimer
        numOfMarkers={markers.length}
        disabled={!fetchInProgress}
        setProgress={setProgress}
        progress={progress}
      />
    </div>
  );
};
export default App;
