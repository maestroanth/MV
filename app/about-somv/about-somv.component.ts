import { Component, OnInit } from '@angular/core';
import { StatusService } from "../status.service";

@Component({
  selector: 'app-about-somv',
  templateUrl: './about-somv.component.html',
  styleUrls: ['./about-somv.component.css']
})
export class AboutSomvComponent implements OnInit {

    constructor(private status: StatusService) { }

  ngOnInit() {
      this.status.changeStatus(" About SOMV ");
  }

  marshmallowModal() {
      $("#marshmallowModal").modal('toggle');
  }

  universeModal() {
      $("#universeModal").modal('toggle');
  }

}
