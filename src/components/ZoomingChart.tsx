import React, { useState } from "react";
import { VictoryChart, VictoryZoomContainer, VictoryScatter } from "victory";
import { minBy, maxBy, flatten } from 'lodash'
import { ITimeseries } from "../pages/ChartPage";

type IProps = {
  timeseriesArr: ITimeseries[]
}

export const ZoomingChart = (props: IProps) => {

  const maxPoints = 10000
  const [zoomedXDomain, setZoomedXDomain] = useState<[Date, Date]>([new Date('2010-01-01'), new Date('2023-01-01')]);

  const { timeseriesArr } = props

  if ((timeseriesArr.length === 0)) return (
    <>
      <div className="h-full w-full flex flex-col items-center">
        <div className=" py-3 pl-36 font-bold">ITS_LIVE Ice Flow Speed m/yr</div>
        <div className="flex flex-row items-center">
          <div className="-rotate-90 whitespace-nowrap">speed (m/y)</div>
          <VictoryChart
            height={600}
            width={1000}
            scale={{ x: "time", y: "linear" }}
            domain={{ x: [new Date('2010-01-01'), new Date('2023-01-01')], y: [0, 1000] }}
            containerComponent={<VictoryZoomContainer
              zoomDimension="x"
              onZoomDomainChange={(domain) => {
                setZoomedXDomain(domain.x as [Date, Date])
              }}
              minimumZoom={{ x: 10000 }}
            />}
          >
          </VictoryChart>
        </div>
        <div className="pl-36">date</div>
      </div>
      {/* <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ "width": "45%" }}></div>
      </div> */}
    </>
  )
  //TODO: memoize getDate - see if you can improve performance
  function getData(): Array<ITimeseries & {
    filteredTimeseries: [Date, number][]
  }> {

    const filteredTimeseries = timeseriesArr.map((timeseries: ITimeseries) => {
      const filteredTimeseries = timeseries.data.filter((d) => (d[0] >= zoomedXDomain[0] && d[0] <= zoomedXDomain[1]));
      if (filteredTimeseries.length > maxPoints) {
        const k = Math.ceil(filteredTimeseries.length / maxPoints);
        return filteredTimeseries.filter(
          (d, i) => ((i % k) === 0)
        );
      }
      return filteredTimeseries;
    })

    return timeseriesArr.map((timeseries, i) => {
      return {
        ...timeseries,
        filteredTimeseries: filteredTimeseries[i]
      }
    })
  }
  function getEntireDomain(data: [Date, number][][]): { x: [Date, Date], y: [number, number] } {
    if (data.length === 0) return ({ x: [new Date('2010-01-01'), new Date('2023-01-01')], y: [0, 3000] })

    const flattenedData = flatten(data);
    return {
      y: [minBy(flattenedData, d => d[1])![1], maxBy(flattenedData, d => d[1])![1]],
      x: [minBy(flattenedData, d => d[0])![0], maxBy(flattenedData, d => d[0])![0]],
    };
  }

  const entireDomain = getEntireDomain(timeseriesArr.map(timeseries => timeseries.data));
  const filteredTimeseriesArr = getData();

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className=" py-3 pl-36 font-bold">ITS_LIVE Ice Flow Speed m/yr</div>
      <div className="flex flex-row items-center">
        <div className="-rotate-90 whitespace-nowrap">speed (m/y)</div>
        <VictoryChart
          height={600}
          width={1000}
          scale={{ x: "time", y: "linear" }}
          domain={entireDomain}
          containerComponent={<VictoryZoomContainer
            zoomDimension="x"
            onZoomDomainChange={(domain) => {
              setZoomedXDomain(domain.x as [Date, Date])
            }}
            minimumZoom={{ x: 1 / 10000 }}
          />}
        >

          {
            filteredTimeseriesArr.map(timeseries =>
              <VictoryScatter
                key={`${timeseries.marker.id}`}
                style={{ data: { fill: `${timeseries.marker.color}` } }}
                x={0}
                y={1}
                data={timeseries.filteredTimeseries}
              />
            )
          }
        </VictoryChart>
      </div>
      <div className="pl-36">date</div>
    </div>
  );
}

// export const ZoomingChartMemo = React.memo(ZoomingChart)
