import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-somv',
  templateUrl: './about-somv.component.html',
  styleUrls: ['./about-somv.component.css']
})
export class AboutSomvComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  marshmallowModal() {
      $("#marshmallowModal").modal('toggle');
  }

  universeModal() {
      $("#universeModal").modal('toggle');
  }

}
