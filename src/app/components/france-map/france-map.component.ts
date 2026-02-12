import { Component, Input, OnInit } from '@angular/core';
import { WineBottle } from '../../models/wine.model';

@Component({
  selector: 'app-france-map',
  templateUrl: './france-map.component.html',
  styleUrls: ['./france-map.component.sass']
})
export class FranceMapComponent {
  @Input() wines: WineBottle[] = [];

  getRegionColor(regionId: string): string {
    const count = this.wines.filter(w => w.region.toLowerCase() === regionId).length;
    if (count === 0) return '#f1f5f9';
    if (count < 5) return '#94a3b8';
    return '#1e293b';
  }
}