import React from "react";
import { BiTrash } from "react-icons/bi";
import { IMarker, ITimeseries } from "../types";

type IProps = {
  setMarkers: React.Dispatch<React.SetStateAction<IMarker[]>>;
  setTimeseriesArr: React.Dispatch<React.SetStateAction<ITimeseries[]>>;
};
const ClearMarkersButton = (props: IProps) => {
  const { setMarkers, setTimeseriesArr } = props;
  return (
    <div className="h-[52px] min-w-[175px]">
      <div className="group relative h-full w-full">
        <button
          type="button"
          className="h-full w-full
          font-sans inline-flex items-center rounded-md border-0
          border-gray-300 bg-white !px-6 !py-3 text-base 
          font-medium text-gray-700 shadow-sm hover:bg-gray-200
          active:bg-gray-300"
          onClick={() => {
            setMarkers([]);
            setTimeseriesArr([]);
          }}
        >
          <BiTrash className="scale-150 !mr-2 !mb-[2px]" />
          Clear Markers
        </button>
      </div>
    </div>
  );
};

export default ClearMarkersButton;
