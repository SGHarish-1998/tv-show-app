import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private storageKey = 'favouriteShows'; //this will be the key for the local storage.

  getFavourites(): any[] {        //this method is used to get the favourite shows from local storage.
    //local storage is a key-value store, so we need to get the value using the key.
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : []; //if data is not null, parse it to JSON and return it, else return an empty array.
  }

  addFavourite(show: any): void {
    const favs = this.getFavourites();//extracting the favourite shows from local storage.
    //check if the show is already in the favourites
    const exists = favs.find((s: any) => s.id === show.id);
    //if it is not, then add it to the favourites.
    if (!exists) {
      favs.push(show);
      localStorage.setItem(this.storageKey, JSON.stringify(favs)); //set the new value to local storage.
    }
  }

  removeFavourite(id: number): void {
    const favs = this.getFavourites().filter((s: any) => s.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(favs));
  }

  isFavourite(id: number): boolean {
    return this.getFavourites().some((s: any) => s.id === id); //check if the show is in the favourites.
    //used in the show-detail component to show the favourite button as filled or not.
  }
}
