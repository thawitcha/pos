import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HistoryPageRoutingModule } from './history-routing.module';
import { BillHistoryComponent } from './bill-history/bill-history.component';
import { HistoryPage } from './history.page';
import { DayHistoryComponent } from './day-history/day-history.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule
  ],
  declarations: [HistoryPage,BillHistoryComponent,DayHistoryComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HistoryPageModule {}
