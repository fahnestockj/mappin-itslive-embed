import React from "react"
import { BiTrash } from "react-icons/bi";

type IProps = {
  setMarkers: React.Dispatch<React.SetStateAction<any[]>>
  md: boolean
}
const ClearMarkersButton = (props: IProps) => {
  const { setMarkers, md } = props
  return (
    <div className="pl-3">

      <div className="group relative w-max">
        <button
          type="button"
          className="
        font-sans inline-flex items-center rounded-md border 
        border-gray-300 bg-white px-6 py-3 text-base 
        font-medium text-gray-700 shadow-sm hover:bg-gray-200 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 
        focus:ring-offset-2"
          onClick={() => {
            setMarkers([])
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


