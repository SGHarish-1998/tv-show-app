import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvmazeService } from 'src/app/services/tvmaze.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent implements OnInit {
  show: any;
  isFav = false;

  constructor(private route: ActivatedRoute,
    private tvmazeService: TvmazeService,private location: Location,private router:Router,private favouriteService: FavouriteService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tvmazeService.getShowDetails(+id).subscribe(data => {
        this.show = data;
        this.isFav = this.favouriteService.isFavourite(this.show.id);
      });
    }
  }
  goBack(): void {
    history.back();
  }

  toggleFavourite(): void {
    if (this.isFav) {
      this.favouriteService.removeFavourite(this.show.id);
      alert('Removed from favourites!');
    } else {
      this.favouriteService.addFavourite(this.show);
      alert('Added to favourites!');
    }
    this.isFav = !this.isFav;
  }
}
