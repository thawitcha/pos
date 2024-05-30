import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss'],
})
export class AddDiscountComponent implements OnInit {

  profileForm!: FormGroup;

  constructor(public modal:ModalController) { }

  ngOnInit() {
     this.profileForm = new FormGroup({
      discount_name: new FormControl(''),
      discount_count: new FormControl(''),
      discount_point: new FormControl(''),
      discount_type: new FormControl(''),
    });
  }

  onSubmit(){
    console.log(this.profileForm.value);
  }

  
}
