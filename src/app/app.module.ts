import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { PaginationComponent } from './modules/pagination/pagination.component';
import { ChartComponent } from './modules/chart/chart.component';
import { RoutingModule } from './routing/routing.module';
import { BarChartComponent } from './modules/bar-chart/bar-chart.component';
import { DemoComponent } from './modules/ruff/demo.component';
import { FormsComponent } from './modules/ruff/forms/forms.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PaginationComponent,
    ChartComponent,
    BarChartComponent,
    DemoComponent,
    FormsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
