import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartService } from 'src/app/core/services/chart.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  svg: any;
  dataSource: { name: string, avg: number }[];
  svgCir: any;
  rect: any;
  d3Line: any;
  d3Ellipse: any;
  d3Polygon: any;
  d3polyline: any;
  d3Anim: any;
  constructor(public $self: ChartService) { }

  ngOnInit(): void {
    this.onLoadData();
    this.ond3Circle();
    this.ond3Rect();
    this.ond3Line();
    this.onPolygon();
    this.onAnimAuto();
  }
  onLoadData() {
    this.$self.getBarData().subscribe((res: any[]) => {
      this.dataSource = res;
      this.onLoadChart();
    });
  }

  onLoadChart() {
    this.svg = d3.create('svg').attr('viewBox', [0, 0, 300, 300])
    this.svg.append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(this.dataSource)
      .join('rect')
      .attr('x', d => d.name)
      .attr('width', d => 200)
      .attr('y', d => d.length)
      .attr('height', d => 100);
  }

  ond3Circle() {

    const margin = { top: 10, right: 10, bottom: 30, left: 25 };
    const height = 250;
    this.svgCir = d3.select('#idCir').attr('width', '100%').attr('height', height + margin.bottom)
      /// **This line will help to gives margin around the scale to prevent overlapping
      .append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    let widthOfPage = document.getElementById('idD3').offsetWidth;

    /// **when apply margin around svg then that margin pixel need to remove from tot width
    widthOfPage -= margin.left + 10;

    /* Retuns pixel value when u call method with % value
    example : 1000px is tot width, when you want to get 10% position in pixel then say 'x(10)' // output 100px  */
    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, widthOfPage]);
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    /** Show Axis scale */
    this.svgCir.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));
    this.svgCir.append('g').call(d3.axisLeft(y));

    const anim = d3.transition().duration(1500).ease(d3.easeLinear);

    this.svgCir
      // .attr('height', '300px')
      .append('circle')
      .attr('stroke', 'coral')
      .style('stroke-width', 9)
      .attr('fill', 'coral')
      .attr('cx', x(10))
      .transition(anim)
      .attr('cy', y(50))
      .attr('r', 40);

    this.svgCir
      .append('circle')
      .attr('stroke', 'lightgreen')
      .style('stroke-width', 9)
      .style('fill', 'lightgreen')
      .attr('cx', x(20))
      .transition(anim)
      .attr('cy', y(20))
      .attr('r', 40);

    this.svgCir.append('circle')
      .attr('stroke', 'lightblue')
      .style('stroke-width', 9)
      .style('fill', 'lightblue')
      .attr('cx', x(30))
      .transition(anim)
      .attr('cy', y(12))
      .attr('r', 40);
  }

  ond3Rect() {
    this.rect = d3.select('#idRect')
      .append('rect')
      .attr('fill', 'black')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 50)
      .attr('height', 50);
  }

  ond3Line() {
    this.d3Line = d3.select('#idLine')
      .attr('height', '20px')
      .append('line')
      .attr('stroke', 'red')
      .style('stroke-width', 5)
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 500)
      .attr('y2', 0);

    this.d3Ellipse = d3.select('#idellipse').append('ellipse')
      .attr('fill', 'pink')
      .attr('cx', 90)
      .attr('cy', 50)
      .attr('rx', 80)
      .attr('ry', 50);
  }

  onPolygon() {
    this.d3Polygon = d3.select('#idPolygon')
      .append('polygon')
      .attr('stroke', 'red')
      .attr('fill', 'green')
      .attr('points', '0,200 100,150 210,0 200,120 10,15 10,20');

    this.d3polyline = d3.select('#idPolyLine')
      .append('polyline')
      .attr('stroke', 'yellow')
      .style('stroke-width', 5)
      .attr('fill', 'white')
      .attr('points', '0,200 100,150 210,0 200,120 10,15 10,20');

  }


  /// continuous transition

  onAnimAuto() {
    this.d3Anim = d3.select('#idAnim').attr('height', '300px')
    .append('circle')
      .attr('cy', 50)
      .attr('cx', 50)
      .attr('r', 40)
      .transition()
      .style('fill', 'lightcoral')
      .transition()
      .style('fill', 'lightblue')
      .transition()
      .style('fill', 'lightgreen')
      .remove();
  }



}
