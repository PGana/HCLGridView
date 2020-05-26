import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  dBar: d3;
  data = [{ name: 'ABC', value: 10 }, { name: 'CVD', value: 95 }, { name: 'XYZ', value: 50 }, { name: 'Suresh', value: 25 }];
  margin = { left: 25, right: 10, top: 10, bottom: 35 };
  x: any;
  y: any;

  constructor() { }

  ngOnInit(): void {
    this.onloadeddata();
    this.onLoadBar();
  }

  onLoadBar() {
    const height = 270;
    const width = document.getElementById('idChartContainer').offsetWidth;
    this.dBar = d3.select('#idBar').attr('width', '100%').attr('height', height).append('g').attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    this.onAxis(width, height);
  }

  onAxis(w: number, h: number) {
    /// X Axis Cofig
    // this.x = d3.scaleLinear().domain([0, 100]).range([0, w - this.margin.bottom]);
    const names = this.data.map(d => d.name);
    console.log(names);
    this.x = d3.scaleBand().domain(names).range([0, w - this.margin.bottom]).padding(0.25);
    this.dBar.append('g').attr('transform', `translate(0,${h - this.margin.bottom})`).call(d3.axisBottom(this.x));

    /// Y Axix Config
    this.y = d3.scaleLinear().domain([0, 100]).range([h - this.margin.bottom, 0]);
    this.dBar.append('g').call(d3.axisLeft(this.y));

    /// Bar data config
    this.onLoadbars(w, h);
  }

  /**
   * Bar data configurations
   */
  onLoadbars(w, h) {


    const anim = d3.transition().ease(d3.easeLinear).duration(650);
    const barWidth = 40;
    const height = h - this.margin.bottom;


    this.dBar.selectAll('rect')
      .data(this.data)
      .enter()
      .append('g')
      .append('rect')
      /// This is for set bar width in pixel rather set default bandwidth
      .attr('transform', `translate(${(this.x.bandwidth() / 2) - (barWidth / 2)}, 0)`)
      .attr('fill', 'lightgreen')
      .attr('x', (d, i) => this.x(d.name))
      /** TO enable Bottom-top animation Step :1 set height and y axis value to 0 initial,
       * x if we not set to zero here then animation will be happens top to bttom
       */
      .attr('y', this.y(0))
      .attr('height', 0)
      .attr('width', barWidth)
      .transition(anim)
      .attr('y', (d) => this.y(d.value))
      .attr('height', (d) => height - this.y(d.value));
    /// Set default bandwidth
    // .attr('width', this.x.bandwidth);

    /// *** Shawdow -bar
    // this.dBar.selectAll('rect').append('g')
    // .attr('class', 'shadow-bar')
    //   .data(this.data)
    //   .enter()
    //   .append('rect')
    //   .attr('fill', 'lightgray')
    //   .attr('x', (d) => this.x(d.name))
    //   .attr('y', 0)
    //   .attr('width', barWidth)
    //   .attr('height', height);
  }
  onloadeddata() {
  }

}
