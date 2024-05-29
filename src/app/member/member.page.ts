import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {
  getBackend: any
  member: any [] = [];
  member_input = {
   
    member_name: '',
    member_date: '',
    member_phone: '',
    member_type: ''
  };
  constructor( 
    private backEnd: HttpClient ,
    private appservice : AppService
  ) { }

  ngOnInit():void {
    this.loadMember()
  }
  

  saveMember() {
    console.log('Member saved:', this.member_input);
    this.appservice.postdata('Member/insertMember', this.member_input).subscribe((data: any) => {
      console.log(data);
      
    })

  }

  cancel() {
    console.log('Action canceled');
    
  }
  loadMember() {

    this.getBackend = this.backEnd.get('http://192.168.1.104/POSproject/index.php/Member/getMembersBySearch').subscribe((data: any) => {
      this.member = data;

      console.log(this.member);


    })
  }
}
