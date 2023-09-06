import createPlotlyComponent from 'react-plotly.js/factory'
import Plotly from 'plotly.js-gl2d-dist-min'
import { ITimeseries, colorHexDict } from '../types';

const Plot = createPlotlyComponent(Plotly)

type IProps = {
  timeseriesArr: Array<ITimeseries>
}

const PlotlyChart = (props: IProps) => {
  const { timeseriesArr } = props
  return (
    <div className='w-full h-full'>
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
