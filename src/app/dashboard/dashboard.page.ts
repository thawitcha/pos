import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  getBackend:any
  foods: any = [];
  Daily_sales : any
  totalPrice :number = 0
  constructor(
    private backEnd:HttpClient
  ) { }

  ngOnInit():void {
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
