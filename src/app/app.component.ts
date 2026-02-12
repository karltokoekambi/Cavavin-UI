import { Component, OnInit } from '@angular/core';
import { WineBottle } from './models/wine.model';
import { WineService } from './services/wine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  bottles: WineBottle[] = [];

  constructor(private wineService: WineService) { }

  ngOnInit(): void {
    this.wineService.getBottles().subscribe({
      next: (data) => {
        this.bottles = data;
        console.log('Bouteilles reçues :', this.bottles);
      },
      error: (err) => console.error('Erreur de connexion API :', err)
    });
  }
}
