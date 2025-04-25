import { Component, OnInit } from '@angular/core';
import { TvmazeService } from 'src/app/services/tvmaze.service';
import { ShowStateService } from './show-state.service';
import { Router } from '@angular/router';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {
  shows: any[] = [];  //total shows getting varaible
  visibleShows: any[] = [];  //filter what need to shown to the user
  itemsToShow!: number;

  searchQuery: string = '';
  isSearching: boolean = false;
  showOnlyFavourites: boolean = false;
 
  constructor(private tvmazeService: TvmazeService,private favouriteService: FavouriteService,private showState: ShowStateService, private router: Router) {}
  
  ngOnInit(): void {
    this.searchQuery = this.showState.searchQuery;
    this.isSearching = this.showState.isSearching;
  
    if (this.isSearching && this.showState.searchResults.length > 0) {
      this.visibleShows = this.showState.searchResults;
    } else {
      this.itemsToShow = this.showState.itemsToShow || 10;
      this.fetchShows();
    }
  }

  //implement the method for searching
  onSearch():void{
    const query = this.searchQuery.trim(); // ngmodel will take care

    //empty check
    if (query.length === 0) {
      this.isSearching = false;
      this.searchQuery = '';

      this.itemsToShow = this.showState.itemsToShow = 10;

      this.showState.isSearching = false;
      this.showState.searchQuery = '';
      this.showState.searchResults = [];
      if (this.shows.length === 0) {
        this.fetchShows(); // refills this.shows
      } else {
        this.visibleShows = this.shows.slice(0, this.itemsToShow || 10);
      }
      return;
    }

    this.isSearching = true;
    this.showState.searchQuery = this.searchQuery;
    this.showState.isSearching = true;

    this.tvmazeService.getSearchResults(query).subscribe((results) => {
      this.visibleShows = results.map((res: any) => res.show);
      this.showState.searchResults = this.visibleShows; 
    });
    console.log('Search results:', this.visibleShows.length);
  }

  toggleFavourites(): void {
    this.showOnlyFavourites = !this.showOnlyFavourites;
  
    if (this.showOnlyFavourites) {
      const favs = this.favouriteService.getFavourites();
      this.visibleShows = favs;
    } else {
      if (this.isSearching && this.showState.searchResults.length > 0) {
        this.visibleShows = this.showState.searchResults;
      } else {
        this.visibleShows = this.shows.slice(0, this.itemsToShow || 10);
      }
    }
  }

  fetchShows(): void {
    this.tvmazeService.getShows().subscribe((data) => {
      this.shows = data;
      this.updateVisibleShows();
      setTimeout(() => {
      window.scrollTo(0, this.showState.scrollPosition);
      }, 50); // Slight delay helps
    });
  }
  
  updateVisibleShows(): void {
    this.visibleShows = this.shows.slice(0, this.itemsToShow);
  }
  
  loadMore(): void {
    this.itemsToShow += 10;
    this.updateVisibleShows();
    this.showState.itemsToShow = this.itemsToShow;
  }

  goToDetails(id: number): void {
    this.showState.scrollPosition = window.scrollY;
    this.showState.itemsToShow = this.itemsToShow;
    this.router.navigate(['/show', id]);
  }

  isFavourite(id: number): boolean {
    return this.favouriteService.isFavourite(id);
  }
}