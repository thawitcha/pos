import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.page.html',
  styleUrls: ['./sale.page.scss'],
})
export class SalePage implements OnInit {

  getBackend: any
  foods: any = [];
  Daily_sales: any
  totalPrice: number = 0
  type: number = 1
  foods_search: any = [];
  timeout: any
  in_cart: any = [];

  @ViewChild('input') input!: IonInput;
  constructor(
    private backEnd: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadFood()
    this.cal()

  }
  ionViewDidEnter() {
    this.input.setFocus();
  }
  loadFood() {

    this.getBackend = this.backEnd.get('http://192.168.1.104/POSproject/index.php/foodGroup/getMenuAll').subscribe((data: any) => {
      this.foods = data;
      console.log(this.foods);

    })
  }
  cal() {
    this.Daily_sales = this.backEnd.get('http://192.168.1.104/POSproject/index.php/bill/getOrderBill').subscribe((data: any) => {
      // คำนวณราคารวม
      this.totalPrice = data.map((item: any) => parseInt(item.price) * parseInt(item.total)).reduce((acc: number, curr: number) => acc + curr, 0);

      console.log(this.totalPrice); // แสดงค่าราคารวมในคอนโซล
    })
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    const formData = new FormData();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      formData.append('search', query);

      this.backEnd.post('http://192.168.1.104/POSproject/index.php/foodGroup/getMenuSearch', formData).subscribe((data: any) => {
        this.foods_search = data;
        if (data && data.length > 0) {
          this.in_cart.push(data[0])
        }

        console.log(this.foods_search);
        console.log("cart", this.in_cart);


      });
    }, 500);
  }


}
