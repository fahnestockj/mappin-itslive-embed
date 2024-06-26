import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { IMarker } from "../types";
type IProps = {
  markers: Array<IMarker>;
};
const ExploreMoreButton = (props: IProps) => {
  const { markers } = props;
  const searchParams: string = markers
    .map((marker) => `lat=${marker.latLon.lat}&lon=${marker.latLon.lon}`)
    .join("&")
    .concat("&z=9");
  return (
    <div className="h-[52px] min-w-[166px]">
      <a
        href={`https://its-live.jpl.nasa.gov/app/index.html?${searchParams}`}
        target="_blank"
        rel="noreferrer"
      >
        <div className="group relative h-full w-full">
          <button
            type="button"
            className="h-full w-full
          font-sans inline-flex items-center rounded-md border-0
          border-gray-300 bg-white !px-6 !py-3 text-base 
          font-medium text-gray-700 shadow-sm hover:bg-gray-200
          active:bg-gray-300"
          >
            <BiLinkExternal className="scale-150 !mr-2 !mb-[2px]" />
            Explore More!
          </button>
        </div>
      </a>
    </div>
  );
};

export default ExploreMoreButton;
