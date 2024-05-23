import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalePageRoutingModule } from './sale-routing.module';

import { SalePage } from './sale.page';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
LOAD_WASM().subscribe();
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SalePageRoutingModule,
    NgxScannerQrcodeModule
  ],
  declarations: [SalePage]
})
export class SalePageModule { }
