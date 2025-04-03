import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private storageKey = 'favouriteShows';

  getFavourites(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addFavourite(show: any): void {
    const favs = this.getFavourites();
    const exists = favs.find((s: any) => s.id === show.id);
    if (!exists) {
      favs.push(show);
      localStorage.setItem(this.storageKey, JSON.stringify(favs));
    }
  }

  removeFavourite(id: number): void {
    const favs = this.getFavourites().filter((s: any) => s.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(favs));
  }

  isFavourite(id: number): boolean {
    return this.getFavourites().some((s: any) => s.id === id);
  }

}
