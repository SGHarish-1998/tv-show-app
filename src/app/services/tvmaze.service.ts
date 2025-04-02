import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvmazeService {
  
  private API_URL = 'https://api.tvmaze.com/shows';

  constructor(private http: HttpClient) {}

  getShows(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  getShowDetails(id: number): Observable<any> {
    return this.http.get(`https://api.tvmaze.com/shows/${id}`);
  }

  getSearchResults(query: string): Observable<any> {
    return this.http.get(`https://api.tvmaze.com/search/shows?q=${query}`);
  }
}
