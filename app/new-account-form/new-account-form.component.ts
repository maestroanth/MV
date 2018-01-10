import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { SageAccount } from '../sage-account';
import { APIAccountsService } from '../api-accounts.service';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { SageUserService } from '../sage-user.service';
import { Subscription } from 'rxjs/Subscription';
import { LoadingMessageService } from '../loading-message.service';
import { Tooltip } from '../tooltip';

@Component({
  selector: 'app-new-account-form',
  templateUrl: './new-account-form.component.html',
  styleUrls: ['./new-account-form.component.css'],
  providers: [JsonPipe],
})

export class NewAccountFormComponent implements OnInit {

    constructor(private jsonPipe: JsonPipe, private apiAccountsService: APIAccountsService,
        private router: Router, private sageUserService: SageUserService, private loadingMessageService: LoadingMessageService,
        private tooltip: Tooltip) {
        }

    ngOnInit() {
        this.subscription = this.apiAccountsService.getError().subscribe(incomingError => {
            this.sageNameError = "Server Error: " + incomingError.message;
            this.response = "Please Try Again.";
            this.spinToggle = false;
        })
        //this.apiAccountsService.handleError.subscribe(error => {
      //console.log(error)
      //this.error = error;
    //})
    }


  subscription = new Subscription;
  title = 'Create Your New SOMV Account';
  response;//response to show
  responseData;//response to do internally
  apiCCToken;//api client_credentials token
  apiPasswordToken;
  newSageInfo = new SageAccount;
  sageNameError = null;
  playError;
  myError;
  spinToggle = false;
  sageRequest = {
      id: null,
      sagename: null,
      password: null,
      realname: null,
      email: null,
      created_at: null,
      updated_at: null
  }//if you don't instantiate these you get an error :/


    /**
     * Gets app authorization token from api and then uses that token to create user, then uses new user's credentials to get a new password authorization token
     */
  createNewAccount() {
      this.sageNameError = "";
      this.loadingMessageService.changeLoadingMessage('Directing a new Sage to the Multiverse...');
      this.apiAccountsService.createAccount(this.sageRequest);
  }
  
}