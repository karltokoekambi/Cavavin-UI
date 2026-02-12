import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WineDashboardComponent } from './components/wine-dashboard/wine-dashboard.component';
import { WineListComponent } from './components/wine-list/wine-list.component';

const routes: Routes = [
  { path: 'dashboard', component: WineDashboardComponent },
  { path: 'inventory', component: WineListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
