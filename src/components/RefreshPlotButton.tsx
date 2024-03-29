import { AiOutlineLineChart } from "react-icons/ai";
import { IMarker, ITimeseries, glaciersDict } from "../types";
import { findManyTimeseries } from "../utils/findManyTimeseries/findManyTimeseries";

type IProps = {
  fetchInProgress: boolean
  setFetchInProgress: React.Dispatch<React.SetStateAction<boolean>>
  setProgress: React.Dispatch<React.SetStateAction<number>>
  markers: Array<IMarker>
  setTimeseriesArr: React.Dispatch<React.SetStateAction<ITimeseries[]>>
}
const RefreshPlotButton = (props: IProps) => {
  const { setFetchInProgress, fetchInProgress, markers, setProgress, setTimeseriesArr } = props

  const onClick = async () => {
    setFetchInProgress(true)
    setTimeseriesArr([])
    const res = await findManyTimeseries(markers).catch(err => {
      console.log(err)
      setProgress(0)
    })

    setTimeseriesArr(res || [])
    setFetchInProgress(false)
    setProgress(100)
  }

  /**
   * NOTE: feels too clever (brittle)
   * checks the markers by reference to see if they are in the dictionary
   */
  const allDictionaryMarkers = Object.keys(glaciersDict).map(key => glaciersDict[key].map(glacier => glacier.markers)).flat()
  const markersInDictionary = Boolean(allDictionaryMarkers.find(markersArr => markersArr === markers))
  const disabled = markersInDictionary || fetchInProgress

  return (
    <div className="h-[52px] group relative w-max">
      <button
        onClick={onClick}
        type="button"
        className=" 
            inline-flex items-center rounded-md border-transparent  
            !px-6 !py-3 text-base font-medium text-white shadow-sm  
            bg-mappin-blue
            hover:opacity-80
            active:opacity-70
            disabled:opacity-50 
            font-sans
          "
        disabled={disabled}
      >
        <AiOutlineLineChart className='scale-150 !mr-2 !mb-[2px]' />
        Plot
      </button>
      {markersInDictionary && <span
        className="pointer-events-none absolute -top-5 -left-2 w-max opacity-0 transition-opacity group-hover:opacity-100 shadow-lg text-white"
      >
        Try moving a marker!
      </span>
      }
    </div>
  )
};

export default RefreshPlotButton;

// Interesting tooltip:
/* <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">A top aligned tooltip.</span>
  <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
</div>  */