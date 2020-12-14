import { Component, OnInit } from "@angular/core";
import { latLng, tileLayer, Icon } from "leaflet";
import * as L from "leaflet";
import "leaflet-routing-machine";
import { MarkerService } from "./marker.service";

@Component({
  selector: "marker",
  templateUrl: "./marker.component.html",
  styleUrls: ["./marker.component.scss"]
})
export class MarkerComponent implements OnInit {

  imeis = ["352093080378804",
    "359632107073642",
    "357454071474041",
    "357454071481269",
    "359632107065788",
    "352093082238469",
    "359632105766452"
  ];
  jsonstring: any;
  public map: L.Map;
  currentImei = this.imeis[0];

  constructor(private markerService: MarkerService) {
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

  ngOnInit() { }

  onPageLoads() {
    this.markerService.getRouteValue(this.currentImei).subscribe(data => {
      this.jsonstring = data.data[0];
      this.currentImei = this.imeis[0];
      this.createMarker(this.jsonstring.lat, this.jsonstring.lng, this.jsonstring.imei, this.jsonstring.datetime);
    });
  }

  options = {
    layers: [this.streetMaps],
    zoom: 9,
    center: latLng(22.7289, 75.8303),
  };

  onImeiChange() {
    this.onPageLoads();
  }

  onMapReady(map: L.Map) {
    this.map = map;
  }

  createMarker(lat, long, imei, date): void {
    if (lat && long) {
      L.marker(L.latLng(lat, long), {
        draggable: false,
        icon: new Icon({
          iconUrl: "assets/marker-icon.png",
          iconSize: [25, 41],
        })
      }).bindPopup(imei + "<br>" + date).openPopup().addTo(this.map)
    }
  }
}
