import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  items = [
    { imageUrl: 'https://beers-withme.com/wp-content/uploads/2023/09/1.jpg' },
    // Add more items as needed
];
  constructor() { }

  ngOnInit() {9
  }

}
