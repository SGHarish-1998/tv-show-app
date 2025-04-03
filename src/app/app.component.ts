import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tv-show-app';

  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }
}
