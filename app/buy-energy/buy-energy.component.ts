import { Component, OnInit } from '@angular/core';
import { StatusService } from "../status.service";

@Component({
  selector: 'app-buy-energy',
  templateUrl: './buy-energy.component.html',
  styleUrls: ['./buy-energy.component.css']
})
export class BuyEnergyComponent implements OnInit {

  constructor(private status: StatusService) { }

  ngOnInit() {
      this.status.changeStatus(" Developer Support ");
  }
  
  submitPaypalForm() {
      $("#paypalForm").submit();//not an error if IDE intellisense marks it as one
  }
}
