import { Component, OnInit, NgZone, Input, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { isPlatformBrowser } from '@angular/common';
import { SensorService } from '../shared/sensor.service';
import { ActivatedRoute } from '@angular/router';
import { SensorStatusIdEnum } from '@app/shared/services';

@Component({
  selector: 'app-sensor-detail-analytics',
  templateUrl: './sensor-detail-analytics.component.html',
  styleUrls: ['./sensor-detail-analytics.component.scss']
})
export class SensorDetailAnalyticsComponent implements OnInit, OnDestroy {

  chart: am4charts.XYChart;
  categoryAxis: any;
  dateAxis: any;
  valueAxis: any;
  currentBar: any;
  sensorId: number;

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId,
    private sensorService: SensorService,
    private activatedRoute: ActivatedRoute
  ) { }


  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnInit(): void {
    this.sensorId = +this.activatedRoute.snapshot.params.sensorId;
    this.getSensorDetailAnalyticsPerformance();
    // this.getSensorDetailAnalyticsStatus();
    this.getTestDetail();

  }

  getSensorDetailAnalyticsPerformance() {
    this.sensorService.getSensorDetailAnalyticsPerformance(this.sensorId).subscribe(
      data => {
        // console.log(JSON.stringify(data.Data));
        this.lineGraph(data.Data);
        // this.drawWithData(data.Data);
      },
      error => {
      });
  }

  getSensorDetailAnalyticsStatus() {
    this.sensorService.getSensorDetailAnalyticsStatus(this.sensorId).subscribe(
      data => {
        // console.log(JSON.stringify(data));
        this.drawWithData(data.Data);
      },
      error => {
      });
  }

  private getTestDetail() {
    this.sensorService.getTestDetail().subscribe(
      data => {
        // this.lineGraph(data);
        this.drawWithData(data.Data);
      });
  }


  lineGraph(values) {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      const chart = am4core.create('chartdiv', am4charts.XYChart);
      chart.paddingRight = 20;
      const data = [];
      for (let i = 0; i < values.length; i++) {
        data.push({ date: new Date(values[i].DateTime), name: 'name' + i, value: values[i].Value });
      }
      chart.data = data;
      chart.mouseWheelBehavior = 'zoomXY';
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.baseInterval = {
        'timeUnit': 'minute',
        'count': 1
      };

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'value';
      series.tooltipText = '{valueY.value}';

      chart.cursor = new am4charts.XYCursor();

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 3;
      bullet.circle.strokeOpacity = 0;
      bullet.tooltipText = '{valueY}';
      const bullethover = bullet.states.create('hover');
      bullethover.properties.scale = 1.5;

      bullet.adapter.add('fill', function (fill, target) {
        if (target.dataItem['valueY'] <= 20) {
          return am4core.color('#E87A7A');
        }
        else if (target.dataItem['valueY'] >= 21 && target.dataItem['valueY'] <= 40) {
          return am4core.color('#FFBD2F');
        }
        else if (target.dataItem['valueY'] >= 41 && target.dataItem['valueY'] <= 60) {

          return am4core.color('#5CB592');
        }

        else if (target.dataItem['valueY'] >= 61 && target.dataItem['valueY'] <= 80) {

          return am4core.color('#FFBD2F');
        }
        else {
          return am4core.color('#E87A7A');
        }
        return fill;
      })

      const range = valueAxis.createSeriesRange(series);
      range.value = 0;
      range.endValue = 20;
      range.contents.stroke = am4core.color('#E87A7A');
      range.contents.fill = range.contents.stroke;

      const range1 = valueAxis.createSeriesRange(series);
      range1.value = 21;
      range1.endValue = 40;
      range1.contents.stroke = am4core.color('#FFBD2F');
      range1.contents.fill = range1.contents.stroke;

      const range2 = valueAxis.createSeriesRange(series);
      range2.value = 41;
      range2.endValue = 60;
      range2.contents.stroke = am4core.color('#5CB592');
      range2.contents.fill = range2.contents.stroke;

      const range3 = valueAxis.createSeriesRange(series);
      range3.value = 61;
      range3.endValue = 80;
      range3.contents.stroke = am4core.color('#FFBD2F');
      range3.contents.fill = range3.contents.stroke;

      const range4 = valueAxis.createSeriesRange(series);
      range4.value = 81;
      range4.endValue = 1000;
      range4.contents.stroke = am4core.color('#E87A7A');
      range4.contents.fill = range4.contents.stroke;

      this.chart = chart;
    });
  }



  createSeries(field, name, color) {
    const series = this.chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.dateX = 'DateTime';
    series.sequencedInterpolation = true;
    series.columns.template.fillOpacity = 0.5;
    // series.columns.template.width = am4core.percent(70);
    series.stacked = true;

    series.columns.template.width = am4core.percent(70);

    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    this.chart.scrollbarX = scrollbarX;
    // series.columns.template.tooltipText =
    //   '[bold]{name}[/]\n[font-size:14px]{dateX.formatDate("dd-MM-yyyy hh:mm")}: {valueY}';

    // series.heatRules.push({
    //   'target': series.columns.template,
    //   'property': 'fill',
    //   'min': am4core.color(color),
    //   'max': am4core.color(color),
    //   'dataField': 'valueY'
    // });
    // series.heatRules.push({
    //   'target': series.columns.template,
    //   'property': 'stroke',
    //   'min': am4core.color(color),
    //   'max': am4core.color(color),
    //   'dataField': 'valueY'
    // });

    const columnTemplate = series.columns.template;
    // columnTemplate.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    columnTemplate.fillOpacity = .8;
    columnTemplate.strokeOpacity = 0;
    columnTemplate.fill = am4core.color('#5a5');


    columnTemplate.adapter.add('fill', function (fill, target) {
      const tooltipName = target.dataItem['dataContext']['SensorStatusName'];
      columnTemplate.tooltipText =  '[bold]'+tooltipName+'[/]\n[font-size:14px]{dateX.formatDate("dd-MM-yyyy hh:mm")}: {valueY}';
      if (target.dataItem && (target.dataItem['dataContext']['SensorStatusId'] === SensorStatusIdEnum.critical)) {
        return am4core.color('#E87A7A');
      }
      else {
        return am4core.color('#FFBD2F');
      }
    });

    return series;
  }

  drawWithData(data) {
    this.zone.runOutsideAngular(() => {
      this.chart = am4core.create('chartdiv2', am4charts.XYChart);
      data.forEach(element => {
        element.DateTime = new Date(element.DateTime);
      });
      this.chart.mouseWheelBehavior = 'zoomXY';

 

      const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.baseInterval = {
        'timeUnit': 'hour',
        'count': 24
      };


      this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      this.valueAxis.renderer.inside = true;
      this.valueAxis.renderer.labels.template.disabled = true;
      this.valueAxis.min = 0;

 

      this.createSeries('Value', 'Value', '#FFBD2F');
      // this.createSeries('CriticalMax', 'Critical', '#E87A7A');
      this.chart.data = data;
    });
  }

  dateAxisChanged(ev,that) {
    let start = new Date(ev.target.minZoomed);
    let end = new Date(ev.target.maxZoomed);
    // console.log("New range: " + start + " -- " + end);
    // that.drawWithData('');
    // if (ev.target['axisFullLength'] >= 5500 && fThis.statusAxisLength < 5500) {
    //   fThis.statusAxisLength = 5500;
    //   console.log(ev.target['axisFullLength']);
    // }
    // if (ev.target['axisFullLength'] <= 5500 && fThis.statusAxisLength === 0) {
    //   fThis.statusAxisLength = 0;
    //   console.log(ev.target['axisFullLength']);
    // }
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });

  }



}
