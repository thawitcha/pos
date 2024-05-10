import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'หน้าเพิ่มสินค้า', url: '/add-item'},
    { title: 'หน้าขาย', url: '/sale'},
    { title: 'สินค้าทั้งหมด', url: '/product'},
    { title: 'สินค้าคงคลัง', url: '/inventory'},
    { title: 'ประวัติการขาย', url: '/history'},
    { title: 'member', url: '/member' },
    { title: 'setting', url: '/setting'},
    { title: 'Note', url: '/note'},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
