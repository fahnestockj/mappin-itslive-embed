import createPlotlyComponent from 'react-plotly.js/factory'
import Plotly from 'plotly.js-basic-dist-min'
import { blueX, blueY, greenX, greenY, redX, redY, yellowX, yellowY } from './mockData';

const Plot = createPlotlyComponent(Plotly)

type IProps = {

} 
const ChartPlotly = (props: IProps) => {
  return (
    <div className='w-full h-full'>
      <Plot
        data={[
          {
            x: blueX,
            y: blueY,
            type: 'scatter',
            mode: 'markers',
            marker: { color: 'blue' },
            name: 'Lat: 60.11, Lon: -140.45'
          },
          {
            x: greenX,
            y: greenY,
            type: 'scatter',
            mode: 'markers',
            marker: { color: 'green' },
            name: 'Lat: 60.02, Lon: -140.54'
          },
          {
            x: redX,
            y: redY,
            type: 'scatter',
            mode: 'markers',
            marker: { color: 'red' },
            name: 'Lat: 59.92, Lon: -140.65'
          },
          {
            x: yellowX,
            y: yellowY,
            type: 'scatter',
            mode: 'markers',
            marker: { color: 'yellow' },
            name: 'Lat: 59.83, Lon: -140.78'
          },
        ]}
        layout={{autosize: true, title: 'ITS_LIVE Ice Flow Speed m/yr', xaxis: { title: 'date', type: 'date'}, yaxis: { type:'-', title: 'speed (m/yr)'}}}
        className='w-full h-full'
        />

    </div>
  )
};

export default ChartPlotly;
