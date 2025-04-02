import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowStateService {
  itemsToShow = 10;
  scrollPosition = 0;
}