import { MuMultiLineChartData, MuMultiLineChartYAxis } from './../shared/components/mu-multi-line-chart/models/mu-multi-line-chart-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-line-trial',
  templateUrl: './multi-line-trial.component.html',
  styleUrls: ['./multi-line-trial.component.css']
})
export class MultiLineTrialComponent implements OnInit {

  datas: MuMultiLineChartData[] = [];
  yAxis: MuMultiLineChartYAxis[] = [];
  xStepCount = 5;

  constructor() { }

  ngOnInit() {
    this.loadYAxis();
    this.loadDatas();
  }

  loadYAxis() {
    this.yAxis = [];
    this.yAxis.push({ index: 1, title: 'Y Axis-1', color: 'red' });
    this.yAxis.push({ index: 2, title: 'Y Axis-2', color: 'blue' });
  }

  loadDatas() {
    this.datas.push({
      yIndex: 1, name: 'Data-1', color: 'red', details: [
        { xValue: new Date(2021, 11, 12, 18, 0, 12), yValue: 1 },
        { xValue: new Date(2021, 11, 14, 8, 50, 12), yValue: 3 },
        { xValue: new Date(2021, 11, 11, 9, 10, 12), yValue: 5 },
        { xValue: new Date(2021, 11, 12, 8, 21, 21), yValue: 2 },
        { xValue: new Date(2021, 11, 15, 7, 39, 12), yValue: 7 },
        { xValue: new Date(2021, 11, 18, 21, 0, 12), yValue: 9.2 },
        { xValue: new Date(2021, 12, 12, 4, 42, 12), yValue: 8 },
        { xValue: new Date(2021, 10, 12, 8, 21, 12), yValue: 5 },
      ]
    });
    this.datas.push({
      yIndex: 2, name: 'Data-2', color: 'blue', details: [
        { xValue: new Date(2021, 11, 12, 18, 0, 12), yValue: 25 },
        { xValue: new Date(2021, 11, 14, 8, 50, 12), yValue: 78 },
        { xValue: new Date(2021, 11, 11, 9, 10, 12), yValue: 98 },
        { xValue: new Date(2021, 11, 12, 8, 21, 21), yValue: 21 },
        { xValue: new Date(2021, 11, 15, 7, 39, 12), yValue: 75 },
        { xValue: new Date(2021, 11, 18, 21, 0, 12), yValue: 92 },
        { xValue: new Date(2021, 12, 12, 4, 42, 12), yValue: 78 },
        { xValue: new Date(2021, 10, 12, 8, 21, 12), yValue: 51 },
      ]
    });
  }

  chartMouseZoomIn(event: string) {
    console.log('zoom-in');
  }

  chartMouseZoomOut() {
    console.log('zoom-out');
  }

}
