import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { SageAccount } from '../sage-account';
import { APIAccountsService } from '../api-accounts.service';
import { APIClientAuthService } from '../api-client-auth-service';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { SageUserService } from '../sage-user.service';
import { Subscription } from 'rxjs/Subscription';
import { LoadingMessageService } from '../loading-message.service';
//the message is changed on a component level while the loading screen itself is prompted at the service level, so it changes the loading message depending on sage is created or merely logged in again

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [JsonPipe],
})
export class LoginFormComponent implements OnInit {

    //public loading = false;
    public loadingMessage = "Finding your way to the Multiverse...";
    constructor(private jsonPipe: JsonPipe, private apiAccountsService: APIAccountsService, private apiClientAuthService: APIClientAuthService,
        private router: Router, private sageUserService: SageUserService, private loadingMessageService: LoadingMessageService) {

    }
    

    ngOnInit() {
        this.subscription = this.apiAccountsService.getError().subscribe(incomingError => {
            this.error = "Incorrect Login";
            this.response = "Please Try Again.";
            //this.loading = false;
        })
  }

  subscription = new Subscription;
  title = "Login to SOMV Account";
  sagename = null;
  password = null;
  response = null;
  apiLoginToken;//api password token
  responseData;
  error;
  userSageInfo;
  sage = new SageAccount;

  /**********************************************************************************************************************************
  /* TIP: Remember when you get the password credential, the response token WILL BE tied to the user and not just the app client in general!
  ************************************************************************************************************************************/
  loginToAccount() {
      this.loadingMessageService.changeLoadingMessage('Finding your way back to the Multiverse...');
      this.apiAccountsService.login(this.sagename, this.password);
      this.response = "Finding your way to the Multiverse......";
      this.error = "";
      //this.loading = true;
      
  }


    test() {
        //this.sage['sagename'] = 'BOB';
        //this.sageUserService.sendSage(this.sage);
    }
}
