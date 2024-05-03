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
  constructor(
    private backEnd:HttpClient
  ) { }

  ngOnInit():void {
    this.loadFood()
  }
  loadFood() {

    this.getBackend = this.backEnd.get('http://localhost/POSproject/index.php/foodGroup/getMenuAll').subscribe((data: any) => {
      this.foods = data;
    console.log(this.foods);
    
    })



  }
}
