import { Component, OnInit } from '@angular/core';
import { StatusService } from "../status.service";

@Component({
  selector: 'app-update-log',
  templateUrl: './update-log.component.html',
  styleUrls: ['./update-log.component.css']
})
export class UpdateLogComponent implements OnInit {

    constructor(private status: StatusService) { }

  ngOnInit() {
      this.status.changeStatus(" Developer Log ");
  }

}
