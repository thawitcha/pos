import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInput, ModalController } from '@ionic/angular';
import { AppService } from '../app.service';
import { DiscountComponent } from './discount/discount.component';

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

  change_number: number = 0;
  //เงินสด และ เงินโอน
  
  real_cash: any='';
  bank_cash: any ='';
  @ViewChild('input') input!: IonInput;

  constructor(
    private backEnd: HttpClient,
    public appsevice: AppService,
    private modalCtrl: ModalController

  ) { }


  ngOnInit(): void {
    this.final_price()
  }
  ionViewDidEnter() {
    this.input?.setFocus();
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
  discount2(sum: number) {
       
  }

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
  go(addprice: any) {
    console.log(this.cash);
    if (this.real_cash == '') {
      this.real_cash = 0 
    }
    if (this.bank_cash == '') {
      this.bank_cash = 0 
    }
    switch (this.select_tap) {
      case 1: {
        this.real_cash += addprice
        break;
      }
      case 2: {
        this.bank_cash += addprice
        break;
      }
      default: {
        break;
      }
    }
  }

  sumprice(count: number, price: number) {
    return count * price;
  }
  delete(index: any) {
    this.in_cart.splice(index, 1);
  }

  values: string = '';
  onKey(event: any) {
    console.log(event);

    // this.barcode=event.target.value;
  }
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);


    if (event.key == 'Enter') {
      this.handleInput(this.values)
      this.values = ""
    }
    else {
      this.values += event.key
    }
  }
  clear() {

    this.real_cash = ""
    this.bank_cash = ""
  }

  select_tap: number = 0;

  click_input(event: any) {
    this.select_tap = event

  }
  change() {
    let sum = 0;
    
    sum = (this.real_cash ? this.real_cash: 0 ) + (this.bank_cash ? this.bank_cash: 0)
    if (sum > 0) {
      sum =  sum - this.final_price() 
    }
    
    return sum
  }
  fit() {
    switch (this.select_tap) {
      case 1: {
        this.real_cash = this.final_price()
        this.bank_cash = 0
        break;
      }
      case 2: {
        this.bank_cash = this.final_price()
        this.real_cash = 0
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  async openModal_discount() {
    const modal = await this.modalCtrl.create({
      cssClass: "css-custom-modal-discount",
      component: DiscountComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log(data);

    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
  }

}
