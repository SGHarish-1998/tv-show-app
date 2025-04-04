import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowListComponent } from './components/show-list/show-list.component';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';

const routes: Routes = [
  { path: '', component: ShowListComponent },
  { path: 'show/:id', component: ShowDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'disabled',  
    anchorScrolling: 'disabled'             
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
