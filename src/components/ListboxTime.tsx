import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BiCheck } from 'react-icons/bi';
import { BsChevronExpand } from 'react-icons/bs'
import { IGlacier, IMarker, ITimeseries, glaciersDict } from '../types';
import { malaspinaTimeseriesArr } from './ChartPlotly/mockTimeseries';
import { findManyTimeseries } from '../utils/findManyTimeseries';

type IProps = {
  setMarkers: React.Dispatch<React.SetStateAction<IMarker[]>>
  setTimeseriesArr: React.Dispatch<React.SetStateAction<ITimeseries[]>>
  setProgress: React.Dispatch<React.SetStateAction<number>>
  setFetchInProgress: React.Dispatch<React.SetStateAction<boolean>>
  markers: Array<IMarker>
  mapRef: any
  setVelMosaicChecked: React.Dispatch<React.SetStateAction<boolean>>
}
export function ListboxTime(props: IProps) {
  const { setMarkers, markers, mapRef, setTimeseriesArr, setProgress, setFetchInProgress, setVelMosaicChecked } = props
  const [selected, setSelected] = useState<IGlacier | null>(glaciersDict['Alaska'][0])

  useEffect(() => {
    if (selected && (markers !== selected.markers)) {
      setSelected(null)
    }
  }, [markers, selected])

  return (
    <div className="px-3 z-50 w-72 pt-5 md:pt-0">
      <Listbox value={selected} onChange={setSelected} >
        <div className="relative ">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-[13px] pl-3 pr-10 text-left shadow-md sm:text-sm">
            {selected && <span className="font-sans text-base font-medium text-gray-700 block truncate">{selected.name}</span>}
            {!selected && <span className="font-sans text-base font-medium text-gray-700 block truncate">Select a glacier</span>}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="pl-0 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  sm:text-sm">
              {
                Object.keys(glaciersDict).map((region) => {
                  return (
                    <div key={region}>
                      <Listbox.Option
                        className='font-sans list-none relative cursor-default select-none py-2 pl-10 pr-4 text-black font-bold text-md bg-slate-200'
                        disabled={true}
                        value={region}
                      >
                        {region}
                      </Listbox.Option>
                      {glaciersDict[region].map((glacier) => (
                        <Listbox.Option
                          onClick={async () => {
                            setVelMosaicChecked(false)
                            setMarkers(glacier.markers)
                            setTimeseriesArr([])
                            mapRef.flyTo([glacier.center.lat, glacier.center.lon], glacier.zoomLevel)

                            if (glacier.name === 'Malaspina Glacier') {
                              setTimeseriesArr(malaspinaTimeseriesArr)
                            }
                            else {
                              setFetchInProgress(true)
                              const res = await findManyTimeseries(glacier.markers).catch(err => {
                                console.log(err)
                                setProgress(0)
                              })

                              console.log(res);
                              setTimeseriesArr(res || [])
                              setFetchInProgress(false)
                              setProgress(100)
                            }



                          }}
                          key={glacier.name}
                          className={({ active }) =>
                            `font-sans list-none relative cursor-default select-none py-2 pl-14 pr-4 ${active ? 'bg-sky-100 text-sky-900' : 'text-gray-900'
                            }`
                          }
                          value={glacier}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`font-sans block truncate  text-gray-700 ${selected ? 'font-medium' : 'font-normal'

                                  }`}
                              >
                                {glacier.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-7 text-sky-600">
                                  <BiCheck className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </div>
                  )
                })
              }
            </Listbox.Options >
          </Transition >
        </div>
      </Listbox>
    </div>
  )
}