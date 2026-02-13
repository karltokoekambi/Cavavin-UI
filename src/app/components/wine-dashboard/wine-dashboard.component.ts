import { Component, OnInit } from '@angular/core';
import { WineService } from '../../services/wine.service';
import { WineBottle } from '../../models/wine.model';
// @ts-ignore
import { Chart, registerables } from 'chart.js';
(Chart as any).register(...registerables);

@Component({
  selector: 'app-wine-dashboard',
  templateUrl: './wine-dashboard.component.html',
  styleUrl: './wine-dashboard.component.sass'
})
export class WineDashboardComponent implements OnInit {
  bottles: WineBottle[] = [];

  constructor(private wineService: WineService) { }

  chartData: any;
  chartOptions: any;
  totalBottles: number = 0;

  ngOnInit(): void {
    this.wineService.getBottles().subscribe({
      next: (data) => {
        this.bottles = data;
        this.totalBottles = this.bottles.reduce((sum, b) => sum + b.quantity, 0);

        this.prepareChartData();
      },
      error: (err) => console.error('Erreur lors de la récupération des vins', err)
    });
  }
  prepareChartData() {
    const counts = { red: 0, white: 0, rose: 0, sparkling: 0, sweet: 0 };

    if (this.bottles && this.bottles.length > 0) {
      this.bottles.forEach(b => {
        const typeKey = b.type?.toString().toLowerCase().trim() as keyof typeof counts;
        if (typeKey in counts) {
          counts[typeKey]++;
        }
      });
    }

    this.chartData = {
      labels: ['Rouge', 'Blanc', 'Rosé', 'Effervescent', 'Moelleux'],
      datasets: [{
        data: [counts.red, counts.white, counts.rose, counts.sparkling, counts.sweet],
        backgroundColor: ['#b91c1c', '#fef08a', '#fda4af', '#7dd3fc', '#f59e0b']
      }]
    };
  }

  getSeverity(type: string): "success" | "secondary" | "info" | "warning" | "danger" | undefined {
    switch (type) {
      case 'red': return 'danger';
      case 'white': return 'warning';
      case 'rose': return 'secondary';
      case 'sparkling': return 'info';
      default: return 'secondary';
    }
  }
}
