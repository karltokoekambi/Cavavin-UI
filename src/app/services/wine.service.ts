import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WineBottle } from '../models/wine.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WineService {
  private apiUrl = environment.apiUrl + '/wine';

  constructor(private http: HttpClient) { }

  getBottles(): Observable<WineBottle[]> {
    return this.http.get<WineBottle[]>(this.apiUrl);
  }

  addBottle(wine: WineBottle): Observable<WineBottle> {
    return this.http.post<WineBottle>(this.apiUrl, wine);
  }

  updateBottle(wine: WineBottle): Observable<WineBottle> {
    return this.http.put<WineBottle>(`${this.apiUrl}/${wine.id}`, wine);
  }
}