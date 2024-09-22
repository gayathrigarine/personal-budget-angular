import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { DataService } from '../data.service';
import * as d3 from 'd3';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  public dataSource = {
    datasets: [
        {
            data: [] as number[] ,
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
            ]
        }
    ],
    labels: [] as string[]
};
public svg: any;
  public margin = 50;
  public width = 550 - this.margin * 2;
  public height = 350 - this.margin * 2;

  constructor(private http: HttpClient,private dataService: DataService) {

    const el = document.getElementById('myChart');
    console.log('IS my Chart there?,',el);
  }

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
    })
    this.dataService.fetchDataIfNeeded();

  this.dataService.getData().subscribe((data: any[]) => {
    console.log('data12',data);
    if(data.length > 0){
      this.createSvg()
      this.drawBars(data);
      console.log('data12',data);
    }
  });
}
  createChart() {
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type: "pie",
        data: this.dataSource
    });




}
public createSvg(): void {
  this.svg = d3
    .select('figure#bar')
    .append('svg')
    .attr('width', this.width + this.margin * 2)
    .attr('height', this.height + this.margin * 2)
    .append('g')
    .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
}

public drawBars(data: any[]): void {
  console.log("message",data);
  const x = d3
    .scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.Framework))
    .padding(0.2);

  this.svg
    .append('g')
    .attr('transform', 'translate(0,' + this.height + ')')
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'translate(-10,0)rotate(-45)')
    .style('text-anchor', 'end');

  const y = d3.scaleLinear().domain([0, 200000]).range([this.height, 0]);

  this.svg.append('g').call(d3.axisLeft(y));

  this.svg
    .selectAll('bars')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d: any) => x(d.Framework))
    .attr('y', (d: any) => y(d.Stars))
    .attr('width', x.bandwidth())
    .attr('height', (d: any) => this.height - y(d.Stars))
    .attr('fill', '#d04a35');
}
}
