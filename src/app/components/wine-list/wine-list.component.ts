import { Component, OnInit } from '@angular/core';
import { WineService } from '../../services/wine.service';
import { WineBottle } from '../../models/wine.model';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html'
})
export class WineListComponent implements OnInit {
  wines: WineBottle[] = [];
  displayDialog: boolean = false;
  selectedWine: WineBottle | null = null;

  constructor(private wineService: WineService) { }

  ngOnInit(): void {
    this.loadWines();
  }

  loadWines(): void {
    this.wineService.getBottles().subscribe({
      next: (data) => {
        this.wines = data;
      },
      error: (err) => console.error('Erreur chargement', err)
    });
  }

  showAddDialog() {
    this.selectedWine = null;
    this.displayDialog = true;
  }

  showEditDialog(wine: WineBottle) {
    this.selectedWine = { ...wine };
    this.displayDialog = true;
  }

  saveWine(wine: WineBottle) {
    const wineToSave = { ...wine, id: Number(wine.id) || 0 };
    if (this.selectedWine) {
      this.wineService.updateBottle(wineToSave).subscribe(() => {
        this.loadWines();
        this.displayDialog = false;
      });
    } else {
      this.wineService.addBottle(wineToSave).subscribe({
        next: () => {
          this.loadWines();
          this.displayDialog = false;
        },
        error: (err) => console.log("Détail de l'erreur:", err)
      });
    }
  }
}