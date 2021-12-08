import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuMultiLineChartComponent } from './mu-multi-line-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MuMultiLineChartComponent],
  exports: [MuMultiLineChartComponent]
})
export class MuMultiLineChartModule { }
