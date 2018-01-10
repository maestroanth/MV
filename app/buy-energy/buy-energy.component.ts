import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-energy',
  templateUrl: './buy-energy.component.html',
  styleUrls: ['./buy-energy.component.css']
})
export class BuyEnergyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  submitPaypalForm() {
      $("#paypalForm").submit();//not an error if IDE intellisense marks it as one
  }
}
