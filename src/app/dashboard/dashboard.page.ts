import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
export type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  stroke?: ApexStroke;
  tooltip?: ApexTooltip;
  dataLabels?: ApexDataLabels;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  @ViewChild("chart") chart?: ChartComponent;
   chartOptions?: Partial<ChartOptions> |any;

  getBackend: any
  foods: any = [];
  Daily_sales: any
  totalPrice: number = 0
  constructor(
    private backEnd: HttpClient
  ) { this.chartOptions = {
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41]
      }
    ],
    chart: {
      height: 350,
      type: "area"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z"
      ]
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm"
      }
    }
  };}

  ngOnInit(): void {
    this.loadFood()
    this.cal()
  }
  loadFood() {

    this.getBackend = this.backEnd.get('http://192.168.1.169/POSproject/index.php/foodGroup/getMenuAll').subscribe((data: any) => {
      this.foods = data;
      console.log(this.foods);

    })
  }
  cal() {
    this.Daily_sales = this.backEnd.get('http://192.168.1.169/POSproject/index.php/bill/getOrderBill').subscribe((data: any) => {
      // คำนวณราคารวม
      this.totalPrice = data.map((item: any) => parseInt(item.price) * parseInt(item.total)).reduce((acc: number, curr: number) => acc + curr, 0);

      console.log(this.totalPrice); // แสดงค่าราคารวมในคอนโซล
    });
  }
}
