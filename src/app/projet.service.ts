import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from './projet';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ProjetService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiServerUrl}/projets/all`);
  }

  public addProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(`${this.apiServerUrl}/projets/add`, projet);
  }

  public updateProjet(projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiServerUrl}/projets/update`, projet);
  }

  public deleteProjet(projetId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/projets/delete/${projetId}`);
  }
}