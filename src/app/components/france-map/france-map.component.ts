import { Component, Input, OnInit } from '@angular/core';
import { WineBottle } from '../../models/wine.model';

@Component({
  selector: 'app-france-map',
  templateUrl: './france-map.component.html',
  styleUrls: ['./france-map.component.sass']
})
export class FranceMapComponent {
  @Input() wines: WineBottle[] = [];

}