import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-welcome-form',
  templateUrl: './welcome-form.component.html',
  styleUrls: ['./welcome-form.component.css']
})
export class WelcomeFormComponent implements OnInit {

    constructor(private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
      localStorage.clear();
      this.spinnerService.hide();
      console.log("Energy STORAGE TEST: " + localStorage.getItem('Energy'));
  }


  title = 'Greetings Newcomer! Are you prepared to learn the ways of the Multiverse?';
}
