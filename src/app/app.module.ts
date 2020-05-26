import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { PaginationComponent } from './modules/pagination/pagination.component';
import { ChartComponent } from './modules/chart/chart.component';
import { RoutingModule } from './routing/routing.module';
import { BarChartComponent } from './modules/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PaginationComponent,
    ChartComponent,
    BarChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
