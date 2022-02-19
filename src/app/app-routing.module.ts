import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloInfiniteRowComponent } from './hello-infinite-row/hello-infinite-row.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hello-infinite-row', component: HelloInfiniteRowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
