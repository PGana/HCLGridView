import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../modules/home/home.component';
import { ChartComponent } from '../modules/chart/chart.component';

const routes: Routes = [
  { path: 'grid', component: HomeComponent },
  { path: 'chart', component: ChartComponent },
  { path: '', redirectTo: 'grid', pathMatch: 'full' }
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
