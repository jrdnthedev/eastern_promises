import { Component, Input } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-vertical-bar-chart',
  imports: [NgxChartsModule],
  templateUrl: './vertical-bar-chart.component.html',
  styleUrl: './vertical-bar-chart.component.scss',
})
export class VerticalBarChartComponent {
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Customer';
  showYAxisLabel = true;
  yAxisLabel = 'Amount';
  legendTitle = 'Years';
  colorScheme: Color = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
  };
  @Input() chartData: any = [];

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
