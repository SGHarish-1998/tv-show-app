import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvmazeService } from 'src/app/services/tvmaze.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent implements OnInit {
  show: any;

  constructor(private route: ActivatedRoute,
    private tvmazeService: TvmazeService,private location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tvmazeService.getShowDetails(+id).subscribe(data => {
        this.show = data;
      });
    }
  }

  goBack(): void {
    this.location.back(); // Just like pressing browser back button
  }

}
