import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  getBackend: any
  foods: any [] = [];
  constructor( private backEnd: HttpClient) { }

  ngOnInit(): void {
    this.loadFood()
  }
  loadFood() {

    this.getBackend = this.backEnd.get('http://192.168.1.104/POSproject/index.php/Product/getProduct').subscribe((data: any) => {
      this.foods = data;
      console.log(this.foods);

    })
  }

}
