import { AiOutlineLineChart } from "react-icons/ai";
import ProgressBarWithTimer from "./ProgressBarWithTimer";
import { IMarker } from "../types";
import axios from "axios";
import { findManyTimeseries } from "../utils/findManyTimeseries";
import { markersInit } from "./ChartPlotly/mockMarkers";

type IProps = {
  fetchInProgress: boolean
  setFetchInProgress: React.Dispatch<React.SetStateAction<boolean>>
  setProgress: React.Dispatch<React.SetStateAction<number>>
  markers: Array<IMarker>
  setTimeseriesArr: React.Dispatch<React.SetStateAction<any>>
}
const RefreshPlotButton = (props: IProps) => {
  const { setFetchInProgress, fetchInProgress, markers, setProgress, setTimeseriesArr } = props

  const onClick = async () => {
    setFetchInProgress(true)
    const res = await findManyTimeseries(markers).catch(err => {
      console.log(err)
      setProgress(0)
    })
    
    console.log(res);
    setTimeseriesArr(res || [])
    setFetchInProgress(false)
    setProgress(100)

  }
  const disabled = markers === markersInit || fetchInProgress

  return (
    <>
      <div className="py-5 px-3 ">
        <div className="group relative w-max">
          <button
            onClick={onClick}
            type="button"
            className=" inline-flex items-center rounded-md border border-transparent  px-6 py-3 text-base font-medium text-white shadow-sm  
            focus:outline-none focus:ring-2 focus:ring-[#179abb] 
          focus:ring-offset-2 
          bg-[#0081A1] 
          hover:bg-[#046881]
          disabled:opacity-50 
          disabled:hover:bg-[#0081A1]
          "
            disabled={disabled}
          >
            <AiOutlineLineChart className='scale-150 mr-2 mb-[2px]' />
            Plot
          </button>
          {markers === markersInit && <span
            className="pointer-events-none absolute -top-5 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100 shadow-lg text-white"
          >
            Try moving a marker!
          </span>
          }
        </div>
      </div>
    </>
  )
};

export default RefreshPlotButton;

// Interesting tooltip:
/* <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">A top aligned tooltip.</span>
  <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
</div>  */