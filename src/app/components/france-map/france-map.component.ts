import { Component, Input, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-france-map',
  template: `<div id="map"></div>`,
  styles: [`
#map
  height: 600px
  width: 100%
  border-radius: 8px
  background: #f8f9fa
  z-index: 1
  `]
})
export class FranceMapComponent implements AfterViewInit {
  @Input() wines: any[] = [];
  private map: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initLeaflet();
    }
  }

  private async initLeaflet() {
    const L = await import('leaflet');

    this.map = L.map('map', {
      center: [46.2276, 2.2137],
      zoom: 6,
      zoomControl: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);

    this.loadGeoJson(L);
  }

  private loadGeoJson(L: any) {
    this.http.get('assets/maps/departements.json').subscribe((json: any) => {
      L.geoJSON(json, {
        style: (feature: any) => this.getStyle(feature),
        onEachFeature: (feature: any, layer: any) => {
          const count = this.getWineCount(feature.properties.code);
          layer.bindTooltip(`<b>${feature.properties.nom} (${feature.properties.code})</b><br>Vins: ${count}`);
        }
      }).addTo(this.map);
    });

  }

  private getWineCount(deptCode: string): number {
    if (!this.wines) return 0;

    return this.wines.filter(w => {
      const regionKey = w.region?.toLowerCase().trim();

      const deptsForRegion = this.regionToDeptMap[regionKey] || [];

      return deptsForRegion.includes(deptCode);
    }).length;
  }

  private getStyle(feature: any) {
    const count = this.getWineCount(feature.properties.code);

    return {
      fillColor: count > 0 ? '#b91c1c' : '#ffffff', // Rouge si présent, Blanc sinon
      weight: 1,
      opacity: 1,
      color: '#cbd5e1', // Bordures grises
      fillOpacity: count > 0 ? 0.8 : 0.5
    };
  }

  private regionToDeptMap: { [key: string]: string[] } = {
    'bordeaux': ['33'],
    'bourgogne': ['89'],
    'loire': ['49'],
    'rhone': ['69'],
    'alsace': ['67'],
    'champagne': ['10'],
    'provence': ['13'],
    'languedoc': ['11'],
    'sud-ouest': ['64']
  };
}