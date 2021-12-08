import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MuMultiLineChartCircle, MuMultiLineChartData, MuMultiLineChartPolyLine, MuMultiLineChartRect, MuMultiLineChartStep, MuMultiLineChartYAxis } from './models/mu-multi-line-chart-model';
import { Guid } from '../../helpers/guid';

@Component({
  selector: 'app-mu-multi-line-chart',
  templateUrl: './mu-multi-line-chart.component.html',
  styleUrls: ['./mu-multi-line-chart.component.css']
})
export class MuMultiLineChartComponent implements OnInit {

  @Input() _datas: MuMultiLineChartData[] = [];
  @Input() xTitle = 'X Value';
  @Input() _xMin: number;
  @Input() _xMax: number;
  @Input() yAxis: MuMultiLineChartYAxis[] = [{ title: '', index: 1, color: '#8c8ea4' }];
  @Input() xStepCount = 24;
  @Input() showDate = true;

  @Output() mouseWheelEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() mouseZoomIn: EventEmitter<any> = new EventEmitter<any>();
  @Output() mouseZoomOut: EventEmitter<any> = new EventEmitter<any>();

  divId = Guid.newGuid();
  svgId = Guid.newGuid();
  maxXCoordinate = 1500;
  maxYCoordinate = 700;

  x1 = 60;
  x2 = 600;
  y1 = 30;
  y2 = 0;
  xMin: number;
  xMax: number;

  ySpaceCoefficient = 60;

  xDashAxis: MuMultiLineChartYAxis[] = [];
  yDashAxis: MuMultiLineChartYAxis[] = [];
  xSteps: MuMultiLineChartStep[];
  polyLines: MuMultiLineChartPolyLine[] = [];
  circles: MuMultiLineChartCircle[] = [];
  infoLineX1 = -1;
  infoLineX2 = -1;

  rect: MuMultiLineChartRect;

  constructor() {
  }

  ngOnInit() {
    this.x1 = 60;
    this.y1 = 30;
    this.x2 = this.maxXCoordinate - 50;
    this.y2 = this.maxYCoordinate - 50;
    if (this._datas != undefined) { this._datas.forEach(x => x.index = Guid.newGuid()); }
    this.addAxisY();
    this.addAxisX();
    this.addPolyLine();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

  addAxisY() {

    this.xDashAxis = [];
    this.yAxis = this.yAxis.sort((a, b) => (Number(a.index) <= Number(b.index) ? 1 : -1));

    this.yAxis.forEach((y, index) => {
      y.x1 = this.x1;
      y.y1 = this.y1;
      y.x2 = this.x1;
      y.y2 = this.y2;

      let yMinValue = y.min;
      let yMaxValue = y.max;

      const yValues = this._datas.filter(x => x.yIndex == y.index);
      if (yValues) {
        yValues.forEach(item => {
          item.details = item.details.sort((a, b) => (Number(a.yValue) >= Number(b.yValue) ? 1 : -1));
          const i = item.details.length;
          if (i > -1) {
            yMinValue = yMinValue == undefined || item.details[0].yValue < yMinValue ? item.details[0].yValue : yMinValue;
            yMaxValue = yMaxValue == undefined || item.details[i - 1].yValue > yMaxValue ? item.details[i - 1].yValue : yMaxValue;
          }
        });
      }

      y.min = y.min ? y.min : yMinValue;
      y.max = y.max ? y.max : yMaxValue;

      if (y.min == y.max) { y.min = y.min - 1; y.max = y.max + 1; }
      const length = 10;
      const coefficient = (this.y2 - this.y1) / (y.max - y.min);

      y.steps = [];

      for (let i = 0; i <= length && y.min != undefined && y.max != undefined; i++) {
        // Korinate hesaplama
        const yCoefficient = (((y.max - y.min) / length) * i);
        const coordinateY = ((coefficient * yCoefficient) + this.y1);

        const content = Number(((y.max) - yCoefficient).toFixed(3)).toString();
        if (index == this.yAxis.length - 1) {
          this.xDashAxis.push({ index: 0, title: '', color: 'black', x1: this.x1, x2: this.x2, y1: coordinateY, y2: coordinateY });
        }
        y.steps.push({ x: this.x1, y: coordinateY, titles: [content] });
      }

      this.x1 = this.x1 + this.ySpaceCoefficient;
    });
    this.x1 = this.x1 - this.ySpaceCoefficient;

  }

  addAxisX() {
    this.xSteps = [];
    this.yDashAxis = [];

    let xMaxValue: number | Date;
    let xMinValue: number | Date;
    this._datas.forEach(data => {
      data.details = data.details.sort((a, b) => (Number(a.xValue) >= Number(b.xValue) ? 1 : -1));
      const i = data.details.length;
      if (i > -1) {
        xMaxValue = xMaxValue == undefined || data.details[i - 1].xValue > xMaxValue ? data.details[i - 1].xValue : xMaxValue;
        xMinValue = xMinValue == undefined || data.details[0].xValue < xMinValue ? data.details[0].xValue : xMinValue;
      }
    });
    this.xMax = this._xMax ? this._xMax : (typeof (xMaxValue) == 'object' ? new Date(xMaxValue).getTime() : xMaxValue);
    this.xMin = this._xMin ? this._xMin : (typeof (xMinValue) == 'object' ? new Date(xMinValue).getTime() : xMinValue);

    //#region x düzleminde gösterilecek değerler. length=>gösterilecek nokta sayısı
    const coefficient = (this.x2 - this.x1) / (this.xMax - this.xMin);
    for (let i = 0; i < this.xStepCount; i++) {
      // Korinate hesaplama
      const xCoefficient = (((this.xMax - this.xMin) / this.xStepCount) * i);
      const coordinateX = ((coefficient * xCoefficient) + this.x1);

      let txt = typeof (xMaxValue) == 'object' ? new Date(xCoefficient + this.xMin).toDateTimeString() : (xCoefficient + this.xMin).toFixed(2);
      if (typeof (xMaxValue) == 'object' && txt.split(':').length == 3) {
        const time = txt.split(':');
        txt = time[0] + ':' + time[1];
      }

      if (typeof (xMaxValue) == 'object') {
        txt = this.showDate ? txt : txt.split(' ')[1];
      }

      this.xSteps.push({ x: coordinateX, y: this.y2, titles: txt.split(' ') });
      this.yDashAxis.push({ index: 0, title: '', color: 'black', x1: coordinateX, x2: coordinateX, y1: this.y1, y2: this.y2 });
    }
    //#endregion
  }

  addPolyLine() {
    this.circles = [];
    this.polyLines = [];
    this._datas.forEach(chartLine => {

      let point = '';

      const axisY = this.yAxis.find(x => x.index == chartLine.yIndex);
      chartLine.details.forEach(data => {
        const xCoefficient = (this.x2 - this.x1) / (this.xMax - this.xMin);
        const xValue = (xCoefficient * (typeof (data.xValue) == 'object' ? new Date(data.xValue).getTime() : data.xValue)) + this.x1 - (xCoefficient * this.xMin); // - (xCoefficient * this.xMin)=>this.xMin 0 dan farklı değer olursa bu değer farkı ekleniyor

        const yCoefficient = (this.y2 - this.y1) / (axisY.max - axisY.min);
        const yValue = (yCoefficient * (axisY.max - data.yValue)) + this.y1;
        point = point + xValue + ',' + yValue + ' ';

        this.circles.push({
          x: xValue,
          y: yValue,
          dataX: typeof (data.xValue) == 'object' ? new Date(data.xValue).getTime().toString() : data.xValue.toString(),
          dataY: data.yValue.toString(),
          dataIndex: chartLine.index
        });

      });

      this.polyLines.push({ points: point, color: chartLine.color });
    });
  }

  mouseOver(ev: MouseEvent) {
    const svg = document.getElementById(this.divId).getElementsByTagName('svg')[0];
    const pt = svg.createSVGPoint();
    pt.x = ev.clientX;
    pt.y = ev.clientY;
    const globalPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
    const glabalX = globalPoint.x;
    globalPoint.x = globalPoint.x < this.x1 ? this.x1 : globalPoint.x;
    globalPoint.x = globalPoint.x > this.x2 ? this.x2 : globalPoint.x;

    this.infoLineX1 = globalPoint.x;
    this.infoLineX2 = globalPoint.x;

    globalPoint.x = globalPoint.x > 1300 ? globalPoint.x - 200 : globalPoint.x;
    globalPoint.y = globalPoint.y > 560 ? 560 : globalPoint.y;

    this.rect = new MuMultiLineChartRect();

    this.rect.x = globalPoint.x;
    this.rect.y = globalPoint.y;

    let controlXTspan = false;
    this._datas.forEach(chartLine => {
      const result = Array.from(document.getElementById(this.svgId).getElementsByTagName('circle'))
        .find(x => Number(x.getAttribute('cx')) >= glabalX && x.getAttribute('dataY') != null && x.getAttribute('dataIndex') == chartLine.index);

      if (result != undefined) {

        const xType = typeof (chartLine.details[0].xValue) == 'object';
        if (Number(result.getAttribute('cx')) == glabalX || chartLine.details.findIndex(x => (xType ? new Date(x.xValue).getTime() : x.xValue) < Number(result.getAttribute('dataX'))) > -1) {
          if (!controlXTspan) {
            const time = xType ? new Date(Number(result.getAttribute('dataX'))).toDateTimeString() : result.getAttribute('dataX');
            this.rect.titles.push(time);
            controlXTspan = true;
          }
          this.rect.titles.push(chartLine.name + ' => ' + result.getAttribute('dataY'));
        }
      }
    });
  }

  mouseWheel(ev) {
    if (ev.deltaY == -100) {
      const svg = document.getElementById(this.divId).getElementsByTagName('svg')[0];
      const pt = svg.createSVGPoint();
      pt.x = ev.clientX;
      pt.y = ev.clientY;
      const globalPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
      const glabalX = globalPoint.x;
      globalPoint.x = globalPoint.x < this.x1 ? this.x1 : globalPoint.x;
      globalPoint.x = globalPoint.x > this.x2 ? this.x2 : globalPoint.x;

      this.infoLineX1 = globalPoint.x;
      this.infoLineX2 = globalPoint.x;

      globalPoint.x = globalPoint.x > 1300 ? globalPoint.x - 200 : globalPoint.x;
      globalPoint.y = globalPoint.y > 560 ? 560 : globalPoint.y;

      this.rect = new MuMultiLineChartRect();

      this.rect.x = globalPoint.x;
      this.rect.y = globalPoint.y;

      let controlXTspan = false;
      this._datas.forEach(chartLine => {
        const result = Array.from(document.getElementById(this.svgId).getElementsByTagName('circle'))
          .find(x => Number(x.getAttribute('cx')) >= glabalX && x.getAttribute('dataY') != null && x.getAttribute('dataIndex') == chartLine.index);

        if (result != undefined) {

          const xType = typeof (chartLine.details[0].xValue) == 'object';
          if (Number(result.getAttribute('cx')) == glabalX || chartLine.details.findIndex(x => (xType ? new Date(x.xValue).getTime() : x.xValue) < Number(result.getAttribute('dataX'))) > -1) {
            if (!controlXTspan) {
              const time = xType ? new Date(Number(result.getAttribute('dataX'))).toDateTimeString() : result.getAttribute('dataX');
              controlXTspan = true;
              this.mouseZoomIn.emit(time);
              ev.preventDefault();
              return;
            }
          }
        }
      });
    } else {
      this.mouseZoomOut.emit();
    }

  }
}
