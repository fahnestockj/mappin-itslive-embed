import createPlotlyComponent from 'react-plotly.js/factory'
import Plotly from 'plotly.js-basic-dist-min'
import { IMarker, ITimeseries } from '../../types';
import { useEffect, useState } from 'react';
import { findManyTimeseries } from '../../utils/findManyTimeseries';
import ProgressBarWithTimer from '../ProgressBarWithTimer';

const Plot = createPlotlyComponent(Plotly)

type IProps = {
  timeseriesArr: Array<ITimeseries>
  md: boolean
}

const ChartPlotly = (props: IProps) => {
  const { timeseriesArr, md } = props
  return (
    <div className='w-full h-full'>
      <Plot
        data={
          timeseriesArr.map((timeseries: ITimeseries) => {
            return {
              x: timeseries.data.midDateArray,
              y: timeseries.data.velocityArray,
              type: 'scatter',
              mode: 'markers',
              marker: { color: timeseries.marker.color },
              name: `Lat: ${timeseries.marker.latLon.lat}, Lon: ${timeseries.marker.latLon.lon}`
            }
          })
        }
        layout={{showlegend: md, autosize: true, title: 'ITS_LIVE Ice Flow Speed m/yr', xaxis: { title: 'date', type: 'date' }, yaxis: { type: '-', title: 'speed (m/yr)' } }}
        config={{ doubleClick: 'autosize', displaylogo: false, showTips: false, responsive: true  }}
        className='w-full h-full'
      />

    </div>
  )
};

export default ChartPlotly;
