import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInput } from '@ionic/angular';
import { AppService } from '../app.service';

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
  item_list: any
  cash: number = 0;

  @ViewChild('input') input!: IonInput;

  constructor(
    private backEnd: HttpClient,
    public appsevice: AppService
  ) { }


  ngOnInit(): void {
    this.final_price()
  }
  ionViewDidEnter() {
    this.input.setFocus();
  }


  handleInput(qrcode: any) {
    // const query = event.target.value.toLowerCase();
    const formData = new FormData();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      formData.append('search', qrcode);

      this.appsevice.postdata('foodGroup/getMenuSearch', formData).subscribe((data: any) => {
        this.foods_search = data;
        if (data && data.length > 0) {
          let fill: any;
          if (this.in_cart.length > 0) {


            fill = this.in_cart.filter((res: any) => {
              return res.barcode == data[0].barcode;
            }).length;
            console.log(fill);

            let inter = 0
            this.in_cart.forEach((res: any, index: number) => {
              if (res.barcode == data[0].barcode) {
                inter = index;
              }

            });
            if (fill == 1) {
              this.in_cart[inter].count++;
            }
            else {
              data[0].count = 1
              this.in_cart.push(data[0])
            }
            console.log(this.in_cart);
           

          }
          else {
            data[0].count = 1
            // console.log(data[0]);
            this.in_cart.push(data[0])
          }
        }
 
        console.log(this.foods_search);
        console.log("cart", this.in_cart);


      });
    }, 200);
  }
  discount: any = 5

  sum_price() {
    let sum: number = 0
    const initialValue = 0;
    sum = this.in_cart.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + currentValue.count * currentValue.price
      ,
      initialValue,
    );
    return sum
  }
  final_price() {
    let sum = 0
    if (this.discount <= this.sum_price()) {
      sum = this.sum_price() - this.discount
      console.log(sum);

    }
    return sum
  }
  go(addprice: number) {
    this.cash += addprice
    console.log(addprice);
    this.change()
  }
  change() {
    throw new Error('Method not implemented.');
  }
  sumprice(count: number, price: number) {
    return count * price;
  }
  delete(index: any) {
    this.in_cart.splice(index, 1);
  }

  barcode: string='';
  values: string ='';
  onKey(event: any) {
    console.log(event);
    
    // this.barcode=event.target.value;
}
@HostListener('document:keypress',['$event'])
handleKeyboardEvent(event:KeyboardEvent){
  console.log(event);
  console.log(this.barcode);
  
  if (event.key == 'Enter') {
    // this.barcode = this.values
    // console.log(this.barcode);
    this.handleInput(this.values)
    this.values = ""
  }
  else {
this.values += event.key
  }
}
}
