import { Component, OnInit } from '@angular/core';
import { TvmazeService } from 'src/app/services/tvmaze.service';
import { ShowStateService } from './show-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {
  shows: any[] = [];
  visibleShows: any[] = [];
  itemsToShow!: number;

  searchQuery: string = '';
  isSearching: boolean = false;
 
  constructor(private tvmazeService: TvmazeService,private showState: ShowStateService, private router: Router) {}
  
  ngOnInit(): void {
    this.itemsToShow = this.showState.itemsToShow || 10;
    this.fetchShows();
  }

  //implement the method for searching
  onSearch():void{
    const query = this.searchQuery.trim(); // ngmodel will take care

    //empty check
    if (query.length === 0) {
      this.isSearching = false;
      this.updateVisibleShows(); // restore default list
      return;
    }

    this.isSearching = true;

    this.tvmazeService.getSearchResults(query).subscribe((results) => {
      this.visibleShows = results.map((res: any) => res.show);
    });
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
}
