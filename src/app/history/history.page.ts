import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
 order_id_main:number | undefined
 getBackend :any 
 history : any=[]
  constructor( private backEnd: HttpClient) { }

  ngOnInit(): void {
    // this.loadFood()

  }
  // loadFood() {

  //   this.getBackend = this.backEnd.get('http://192.168.1.169/POSproject/index.php/Bill/getBillHistory').subscribe((data: any) => {
  //     this.history = data;
  //     console.log(this.history);

  //   })
  // }
bill(){
  this.getBackend = this.backEnd.get('http://192.168.1.104/POSproject/index.php/Bill/getBillHistory').subscribe((data: any) => {
    this.history = data;

    console.log(this.history);

  })
}
day(){

  this.getBackend = this.backEnd.get('http://192.168.1.104/POSproject/index.php/Bill/getBillHistory').subscribe((data: any) => {
    this.history = data;


  })

}
}
