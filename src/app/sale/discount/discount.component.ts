import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddDiscountComponent } from './add-discount/add-discount.component';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {

  display_data: any[] = [
    {
      name: "ส่วนลดวันเกิด",
      count: "-10%"
    }
  ];

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  async openModal_add_discount() {
    const modal = await this.modalCtrl.create({
      cssClass: "css-custom-modal-discount",
      component: AddDiscountComponent,
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    let new_discount: any = {
      name: data.name,
      count: ""
    }
    new_discount = this.check(data, new_discount);
    this.display_data.push(new_discount);
    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
  }

  check(data: any, new_discount: any) {
    if (data.type === "ลด") {
      new_discount.count = new_discount.count + "-" + data.count;
      if (data.point === "เปอร์เซ็น") {
        new_discount.count = new_discount.count + "%";
        return new_discount;
      } else {
        new_discount.count = new_discount.count + "บาท";
        return new_discount;
      }
    } else {
      new_discount.count = new_discount.count + "+" + data.count;
      if (data.point === "เปอร์เซ็น") {
        new_discount.count = new_discount.count + "%";
        return new_discount;
      } else {
        new_discount.count = new_discount.count + "บาท";
        return new_discount;
      }
    }
  }

}