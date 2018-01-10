import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-bottom-banner',
  templateUrl: './bottom-banner.component.html',
  styleUrls: ['./bottom-banner.component.css']
})
export class BottomBannerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  public home() {
      if (localStorage.getItem('sage_id')) {
          this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]);//has to navigate and THEN trigger the broadcast singleton
      }
      else {
          this.router.navigate(['./']);//has to navigate and THEN trigger the broadcast singleton

      }
  }

}
