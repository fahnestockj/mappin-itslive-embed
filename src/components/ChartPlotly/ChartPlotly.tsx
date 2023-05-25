import createPlotlyComponent from 'react-plotly.js/factory'
import Plotly from 'plotly.js-basic-dist-min'
import { ITimeseries } from '../../types';
import { malaspinaTimeseriesArr } from './mockTimeseries';

const Plot = createPlotlyComponent(Plotly)

type IProps = {
  timeseriesArr: Array<ITimeseries>
}


const ChartPlotly = (props: IProps) => {
  return (
    <div className='w-full h-full'>
      <Plot
        data={
          malaspinaTimeseriesArr.map((timeseries: ITimeseries) => {
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
        //   [
        //   {
        //     x: blueX,
        //     y: blueY,
        //     type: 'scatter',
        //     mode: 'markers',
        //     marker: { color: 'blue' },
        //     name: 'Lat: 60.11, Lon: -140.45'
        //   },
        //   {
        //     x: greenX,
        //     y: greenY,
        //     type: 'scatter',
        //     mode: 'markers',
        //     marker: { color: 'green' },
        //     name: 'Lat: 60.02, Lon: -140.54'
        //   },
        //   {
        //     x: redX,
        //     y: redY,
        //     type: 'scatter',
        //     mode: 'markers',
        //     marker: { color: 'red' },
        //     name: 'Lat: 59.92, Lon: -140.65',
        //   },
        //   {
        //     x: yellowX,
        //     y: yellowY,
        //     type: 'scatter',
        //     mode: 'markers',
        //     marker: { color: 'yellow' },
        //     name: 'Lat: 59.83, Lon: -140.78'
        //   },
        // ]}
        layout={{ autosize: true, title: 'ITS_LIVE Ice Flow Speed m/yr', xaxis: { title: 'date', type: 'date' }, yaxis: { type: '-', title: 'speed (m/yr)' } }}
        config={{ doubleClick: 'autosize', displaylogo: false, showTips: false }}

        className='w-full h-full'
      />

    </div>
  )
};

export default ChartPlotly;
