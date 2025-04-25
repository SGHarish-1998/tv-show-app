import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowStateService {
  itemsToShow = 10;
  scrollPosition = 0;
  lastClickedId: number | null = null; 
  hasVisitedOnce = false;
  cachedShows: any[] = []; // ✅ cache the show list
  searchQuery: string = '';
  searchResults: any[] = [];
  isSearching: boolean = false;
}