import { Component } from '@angular/core';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrl: './wine-list.component.sass'
})
export class WineListComponent {
  wines = [];
}
