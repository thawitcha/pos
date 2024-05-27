import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
 
 button_bill : number=0
  constructor( private backEnd: HttpClient) { 

  }

  ngOnInit(): void {
    // this.loadFood()

  }
  // loadFood() {

  //   this.getBackend = this.backEnd.get('http://192.168.1.169/POSproject/index.php/Bill/getBillHistory').subscribe((data: any) => {
  //     this.history = data;
  //     console.log(this.history);

  //   })
  // }

segment(number:number){ 
  this.button_bill = number
  console.log(this.button_bill );
  
}
// day(){

//   this.getBackend = this.backEnd.get('http://192.168.1.104/POSproject/index.php/Bill/getBillHistory').subscribe((data: any) => {
//     this.history = data;


//   })

// }
}
