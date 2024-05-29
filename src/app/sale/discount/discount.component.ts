import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
  final_discount: any
  display_data: any[] = []
  constructor(
    public modalCtrl: ModalController,
    public appservice: AppService
  ) {
  }

  ngOnInit() {
    ////จำลองการเซฟข้อมูลเพื่อโยนไปหลังบ้าน แต่ตัวนี้จะเป็นการเก็บข้อมูลเป็น cache เพื่อป้องกันไม่ให้ถูก refresh แล้วหายไป

    // let get: any = localStorage.getItem("discount") || [];
    // this.display_data = JSON.parse(get)
    // console.log(get);

    // console.log(this.display_data);
    this.load_discount()
  }
  load_discount() {
    this.appservice.get('Bill/getDisCount').subscribe((data: any) => {
      this.final_discount = data
      console.log(data);

    })
  }

  async openModal_add_discount() {
    const modal = await this.modalCtrl.create({
      cssClass: "css-custom-modal-discount",
      component: AddDiscountComponent,
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    let new_discount: any = {
      discount_name: data.discount_name,
      discount_count: "",
      id_res_auto: 1,
      discount_point: ""
    }
    new_discount = this.check(data, new_discount);

    this.display_data.push(new_discount)




  }

  check(data: any, new_discount: any) {
    if (data.discount_type === "ลด") {
      new_discount.discount_count = new_discount.discount_count + "-" + data.discount_count;
      if (data.point === "เปอร์เซ็น") {
        new_discount.discount_point = "percen"
        // new_discount.discount_point = new_discount.discount_count + "%";
        return new_discount;
      } else {
        new_discount.discount_point = "bath"
        // new_discount.discount_count = new_discount.discount_count + "บาท";
        return new_discount;
      }
    } else {
      new_discount.discount_count = new_discount.discount_count + "+" + data.discount_count;
      if (data.point === "เปอร์เซ็น") {
        new_discount.discount_point = "percen"
        // new_discount.discount_point = new_discount.discount_count + "%";
        return new_discount;
      } else {
        new_discount.discount_point = "bath"
        // new_discount.discount_count = new_discount.discount_count + "บาท";
        return new_discount;
      }
    }
  }
  save() {
    ////จำลองการเซฟข้อมูลเพื่อโยนไปหลังบ้าน แต่ตัวนี้จะเป็นการเก็บข้อมูลเป็น cache เพื่อป้องกันไม่ให้ถูก refresh แล้วหายไป
    // localStorage.setItem("discount",JSON.stringify(this.display_data));
    this.appservice.postdata('Bill/insertDisCount', this.display_data).subscribe((data: any) => {
      console.log(data);
      this.modalCtrl.dismiss()
    })
  }

}