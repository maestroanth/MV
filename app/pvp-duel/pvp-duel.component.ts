import { Component, OnInit } from '@angular/core';
import { StatusService } from "../status.service";

@Component({
  selector: 'app-pvp-duel',
  templateUrl: './pvp-duel.component.html',
  styleUrls: ['./pvp-duel.component.css']
})
export class PvpDuelComponent implements OnInit {

    constructor(private status: StatusService) { }

    ngOnInit() {
        this.status.changeStatus(" Duel for the Multiverse! ");
  }

}
