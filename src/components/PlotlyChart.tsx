import createPlotlyComponent from 'react-plotly.js/factory'
import Plotly from 'plotly.js-gl2d-dist-min'
import { ITimeseries, colorHexDict } from '../types';
import clsx from 'clsx';

const Plot = createPlotlyComponent(Plotly)

type IProps = {
  timeseriesArr: Array<ITimeseries>
  isLoading: boolean
}

const PlotlyChart = (props: IProps) => {
  const { timeseriesArr, isLoading } = props
  return (
    <div className={clsx('w-full h-full', isLoading && 'animate-pulse')}>
      <Plot
        data={
          timeseriesArr.map((timeseries: ITimeseries) => {
            return {
              x: timeseries.data.midDateArray,
              y: timeseries.data.velocityArray,
              type: 'scattergl',
              mode: 'markers',
              marker: {
                color: colorHexDict[timeseries.marker.color],
              },
              name: `Lat: ${timeseries.marker.latLon.lat.toFixed(3)}, Lon: ${timeseries.marker.latLon.lon.toFixed(3)}`
            }
          })
        }
        layout={{
          autosize: true, title: 'ITS_LIVE Ice Flow Speed m/yr', showlegend: false, 
          xaxis: { title: 'date', type: 'date' }, yaxis: { type: '-', title: 'speed (m/yr)' }
        }}
        config={{ responsive:true, doubleClick: 'autosize', displaylogo: false, showTips: false, modeBarButtonsToRemove: ['select2d', 'lasso2d', 'resetScale2d'] }}
        className='w-full h-full'
      />

    </div>
  )
};

export default PlotlyChart;
