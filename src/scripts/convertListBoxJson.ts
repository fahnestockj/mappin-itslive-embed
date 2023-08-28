import fs from 'fs';
import { IGlacier, IMarker, IRegion } from '../types';
import { createId } from "@paralleldrive/cuid2"
import { getColor } from '../utils/createMarker';


const json = fs.readFileSync('./menu_dict_with_urls.json', 'utf8');
const out: Record<IRegion, Array<IGlacier>> = {}
const data = JSON.parse(json);
for (const region of Object.keys(data)) {
  const glacierArr = []
  for (const glacier of Object.keys(data[region])) {
    const glacierData = data[region][glacier];
    const markers = createMarkers(glacierData.points);
    const glacierObj: IGlacier = {
      name: glacier,
      markers,
      zoomLevel: glacierData.zoom+2,
      center: {
        lat: glacierData.center_point[1],
        lon: glacierData.center_point[0],
      }
    }
    glacierArr.push(glacierObj);
  }
  out[region] = glacierArr;
}
fs.writeFileSync('./glaciers.json', JSON.stringify(out, null, 2), 'utf8');



function createMarkers(coordinates: Array<[number, number]>): Array<IMarker> {
  return coordinates.map((coordinate, i) => {
    return {
      id: createId(),
      color: getColor(i),
      latLon: {
        lat: coordinate[1],
        lon: coordinate[0],
      }
    }
  })
}
