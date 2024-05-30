import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import {ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  constructor() { }

  add : number = 0;
  selectedfile : File|any = null;
  imagePreview: string | null = null;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event : any){
this.selectedfile = event.target.files[0]
 {
  if (!this.selectedfile) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(this.selectedfile);
}
  }
  Sonpum(){
    
  }
 

  ngOnInit() {
  }

}
