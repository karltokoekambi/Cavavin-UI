import { Component, OnInit } from '@angular/core';
import { WineService } from '../../services/wine.service';
import { WineBottle } from '../../models/wine.model';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html'
})
export class WineListComponent implements OnInit {
  wines: WineBottle[] = [];

  constructor(private wineService: WineService) { }

  ngOnInit(): void {
    this.wineService.getBottles().subscribe(data => {
      this.wines = data;
    });
  }
}