import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUser } from './appuser';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AppUserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getAppUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.apiServerUrl}/users/all`);
  }

  public addAppUser(appUser: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.apiServerUrl}/users/add`, appUser);
  }

  public updateAppUser(appUser: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${this.apiServerUrl}/users/update`, appUser);
  }

  public deleteAppUser(appUserId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/users/delete/${appUserId}`);
  }
}