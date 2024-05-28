import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {
  getBackend: any
  member: any [] = [];
  constructor( private backEnd: HttpClient ) { }

  ngOnInit():void {
    this.loadMember()
  }
  loadMember() {

    this.getBackend = this.backEnd.get('http://192.168.1.104/POSproject/index.php/Member/getMembersBySearch').subscribe((data: any) => {
      this.member = data;

      console.log(this.member);


    })
  }
}
