import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { StatusService } from "../status.service";
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.css']
})
export class TopBannerComponent implements OnInit {

    constructor(private status: StatusService, private router: Router) {


    }

    ngOnInit() {
        let energy = localStorage.getItem('Energy');
        if (energy != undefined && energy != null) {
            this.status.changeStatus(status);
        }

        this.status.currentStatus.subscribe(status => this.statusMessage = status);
  }

  
  showEnergy = true;
  statusMessage: string;
  public home() {
      if (localStorage.getItem('sage_id')){
          this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]);//has to navigate and THEN trigger the broadcast singleton
      }
      else {
          this.router.navigate(['./']);//has to navigate and THEN trigger the broadcast singleton

      }
  }

}
