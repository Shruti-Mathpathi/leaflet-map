import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, Icon} from "leaflet";
import * as L from "leaflet";
import "leaflet-routing-machine";
import { PolylineService } from './polyline.service';

@Component({
  selector: 'polyline',
  templateUrl: './polyline.component.html',
  styleUrls: ['./polyline.component.scss']
})
export class PolylineComponent implements OnInit {
  
imeis =   [ "352093080378804",
            "359632107073642",
            "357454071474041",
            "357454071481269",
            "359632107065788",
            "352093082238469",
            "359632105766452"
          ];
jsonstring: any;
public map: L.Map;

constructor(private polylineService:PolylineService) {
}

ngOnInit(): void {
 this.onPageLoads();
}

streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  detectRetina: true,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
  detectRetina: true,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

layersControl = {
  baseLayers: {
    'Street Maps': this.streetMaps,
    'Wikimedia Maps': this.wMaps
  }
};

onPageLoads() {
  let lastPage: number = 0;
  let pageNumber: number = 1;
  let latLongs: L.LatLngExpression[] = [];
  let multiColorOptions = { color: 'red', weight: 3 };
  this.polylineService.getRouteValue("352093080378804", "2020-12-12", pageNumber).subscribe(async data => {
    latLongs = this.constructLatLongList(data.data, latLongs);
    lastPage = data.lastPage
    if (lastPage > 1) {
      for (pageNumber = 2; pageNumber <= lastPage; pageNumber++) {
        data = await this.polylineService.getRouteValue("352093080378804", "2020-12-12", pageNumber).toPromise()
        latLongs = this.constructLatLongList(data.data, latLongs);
      }
      let multipolyline = L.polyline(latLongs, multiColorOptions);
      multipolyline.addTo(this.map);
      this.map.fitBounds(multipolyline.getBounds());
    }
  });
}

constructLatLongList(data: any, latLongs: L.LatLngExpression[]): L.LatLngExpression[] {
  if (data != undefined) {
    data.forEach((element) => {
      latLongs.push(new L.LatLng(element.lat, element.lat))
    });
  }
  return latLongs;
}

options = {
layers: [this.streetMaps],
zoom: 9,
center: latLng(22.7289, 75.8303),
};

onMapReady(map: L.Map) {
this.map = map;
}


}
