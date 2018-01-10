import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { APIAccountsService } from '../api-accounts.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadingMessageService } from '../loading-message.service';

@Component({
  selector: 'app-delete-account-form',
  templateUrl: './delete-account-form.component.html',
  styleUrls: ['./delete-account-form.component.css']
})
export class DeleteAccountFormComponent implements OnInit {

    constructor(private router: Router, private apiAccountsService: APIAccountsService, private spinnerService: Ng4LoadingSpinnerService,
        private loadingMessageService: LoadingMessageService) { }

    ngOnInit() {
        this.spinnerService.hide();
    }

  title = 'The Multiverse says to you,';
  subTitle = 'Remember these actions cannot be UNDONE!';
  subTitle2 = 'Your real-life, AFK existence may have a slight chance of dissipating since you are removing yourself from the Multiverse! I hold no liability for these actions.';
  sage = null;
  sagename = localStorage.getItem('sagename');
  password = null;
  realname = null;
  error = null;
  error2 = null;
  response = null;
  response2 = null;

  confirmDelete() {
      this.loadingMessageService.changeLoadingMessage('The Multiverse is Erasing Your Existence....');
      $('#areYouSureModal').modal('toggle');
      this.sage = this.apiAccountsService.deleteAccount(this.sagename, this.password, this.realname);
      this.spinnerService.show();
      this.sage.subscribe((data) => {
          //setNewData in Local Storage
          this.spinnerService.hide();
          this.response = "Good News! You were successfully deleted from the Multiverse! The good news is if you are still reading this, that means you haven't dissipated! (......yet)";
          this.response2 = "Account Deleted: " + JSON.stringify(data);
          $("#responseModal").modal();
          $("#responseModal").on("hidden.bs.modal", function () {
              $('#responseSubmit').click();
          });

      },
          err => {
              this.error = "Sorry there was an error in deleting your account."
              this.error2 = "Server Message: \"" + err.message +
                  ".  Also make sure your fields are EXACTLY as you entered them when you originally created your account!\"";
              this.spinnerService.hide();
          }
          );
  }

  cueAreYouSure() {
      $("#areYouSureModal").modal();
  }

  public redirect() {
      this.router.navigate(['welcome']);
  }
}
