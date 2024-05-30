import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  constructor() { }
    getBackend: any
    foods: any [] = [];
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
