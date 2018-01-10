import { Component, OnInit, HostBinding} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { SageAccount } from '../sage-account';
import { APIAccountsService } from '../api-accounts.service';
import { APIClientAuthService } from '../api-client-auth-service';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SageUserService } from '../sage-user.service';
import { AccountChangeFormComponent } from './account-change-form/account-change-form.component';
import { AccountSettingsService } from './account-settings.service';
import { StatusService } from "../status.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadingMessageService } from '../loading-message.service';
//import { slideInDownAnimation } from '../animations';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
  providers: [AccountSettingsService]
  //animations: [slideInDownAnimation]
})
export class AccountSettingsComponent implements OnInit {
    sage = {
        id: null,
        sagename: null,
        password: null,
        realname: null,
        email: null,
        created_at: null,
        updated_at: null,
    }
    subForm = {
        caption: null,
        caption2: null,
        showForm: false,
        requestType: null,
        input: ''
    }

    subscription = new Subscription;
    subscriptionForm = new Subscription;
    sageNameWarning = null;
    title = 'Loading...';
    subTitle = '';
    subTitle3 = '';
    energyMessage = '';

    constructor(private sageUserService: SageUserService, private accountSettingsService: AccountSettingsService, private router: Router,
        private status: StatusService, private spinnerService: Ng4LoadingSpinnerService, private loadingMessageService: LoadingMessageService) {
        this.status.changeStatus("Account Settings");
        this.title = 'The Multiverse says to you,';
        this.subTitle = ' "Dear Sage, ' + localStorage.getItem('sagename') + ',' + ' \n I\'m sorry that the Multiverse doesn\'t quite suit your needs."';
        this.subTitle3 = ' How may I adjust them?"';
        if (localStorage.getItem('Energy') == null || localStorage.getItem('Energy') == undefined || localStorage.getItem('Energy') == 'null') {
            this.energyMessage = ' Energy on Account: 0';//so it doesn't show up as undefined if user hasn't created sage character yet
        }
        else {
            this.energyMessage = ' Energy on Account: ' + localStorage.getItem('Energy');
        }
        
          this.subscriptionForm = this.accountSettingsService.getSubForm().subscribe(incomingSubForm => {
            this.subForm = incomingSubForm;
          })
    }


    ngOnInit() {
        this.spinnerService.hide();
    }

  public updateSageName() {
      this.subForm.input = '';
      this.subForm.showForm = false;
      this.subForm.caption2 = '';
      this.sageNameWarning = 'In Order To Change Your Sage Name: Please Contact System Admin at https://www.netdoodler.com (then hit contact from the menu)';
      //this.accountSettingsService.sendSubForm(this.subForm, this.sage.sagename);
  }
  public updatePassword() {
      this.subForm.input = '';
      this.sageNameWarning = '';
      this.subForm.caption2 = '';
      this.subForm.showForm = true;
      this.subForm.requestType = "password";
      this.subForm.caption = 'Change Password';
      this.accountSettingsService.sendSubForm(this.subForm);
  }
  public updateRealName() {
      this.subForm.input = '';
      this.sageNameWarning = '';
      this.subForm.showForm = true;
      this.subForm.requestType = "realname";
      this.subForm.caption = 'Change Your Real Name';
      this.subForm.caption2 = '*Disclaimer*: This does not legally change your name ;p';
      this.accountSettingsService.sendSubForm(this.subForm);
  }
  public updateEmail() {
      this.subForm.input = '';
      this.sageNameWarning = '';
      this.subForm.caption2 = '';
      this.subForm.showForm = true;
      this.subForm.requestType = "email";
      this.subForm.caption = 'Change Email';
      this.accountSettingsService.sendSubForm(this.subForm);
  }

  public delete() {
      this.loadingMessageService.changeLoadingMessage('Traveling to the End of Time...');
      this.spinnerService.show();
      setTimeout(() => {
          this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') + '/delete']);
      }, 150);
  }

  public back() {
      this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]);//has to navigate and THEN trigger the broadcast singleton
  }

}
