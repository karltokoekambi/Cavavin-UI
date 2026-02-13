import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//PrimeNG
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

//Components
import { AppComponent } from './app.component';
import { WineDashboardComponent } from './components/wine-dashboard/wine-dashboard.component';
import { WineListComponent } from './components/wine-list/wine-list.component';
import { FranceMapComponent } from './components/france-map/france-map.component';

@NgModule({
  declarations: [
    AppComponent,
    WineDashboardComponent,
    WineListComponent,
    FranceMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CardModule,
    ChartModule,
    TagModule,
    ButtonModule,
    TableModule
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
