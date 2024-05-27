import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-history',
  templateUrl: './day-history.component.html',
  styleUrls: ['./day-history.component.scss'],
})
export class DayHistoryComponent  implements OnInit {
  order_id_main:number | undefined
  getBackend :any 
  history : any=[]
  sum_total_price : any
  constructor(private backEnd: HttpClient) { }

  ngOnInit() {
    this.day()
  }
  day(){
    this.getBackend = this.backEnd.get('http://192.168.1.104/POSproject/index.php/Bill/getBillHistory').subscribe((data: any) => {
      this.history = data;
      const totalPrice = this.history.reduce((sum :any, item :any) => sum + item.total_price, 0);
      this.sum_total_price = totalPrice;
      console.log('Total Price:', totalPrice);
      console.log(this.history);
  
    })
    
  }
}
