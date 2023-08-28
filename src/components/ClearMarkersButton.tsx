import React from "react"
import { BiTrash } from "react-icons/bi";

type IProps = {
  setMarkers: React.Dispatch<React.SetStateAction<any[]>>
  setTimeseriesArr: React.Dispatch<React.SetStateAction<any[]>>
  md: boolean
}
const ClearMarkersButton = (props: IProps) => {
  const { setMarkers, setTimeseriesArr, md } = props
  return (
    <div className="pl-3">

      <div className="group relative w-max">
        <button
          type="button"
          className="
        font-sans inline-flex items-center rounded-md border-0
        border-gray-300 bg-white px-6 py-3 text-base 
        font-medium text-gray-700 shadow-sm hover:bg-gray-200
        active:bg-gray-300
        "
          onClick={() => {
            setMarkers([])
            setTimeseriesArr([])
          }}
        >
          <BiTrash className='scale-150 mr-2 mb-[2px]' />
          Clear {md && 'Markers'}
        </button>
      </div>
    </div>
  )
};

export default ClearMarkersButton;


