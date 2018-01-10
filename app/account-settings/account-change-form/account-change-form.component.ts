import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { APIAccountsService } from '../../api-accounts.service';
import { Router, NavigationExtras } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadingMessageService } from '../../loading-message.service';
//import { SageAcc } from './hero';

@Component({
    selector: 'app-account-change-form',
    templateUrl: './account-change-form.component.html',
    styleUrls: ['./account-change-form.component.css']
})
export class AccountChangeFormComponent implements OnInit {

    public myForm: FormGroup; // our form model
    constructor(private _fb: FormBuilder, private apiAccountsService: APIAccountsService, private router: Router,
        private spinnerService: Ng4LoadingSpinnerService, private loadingMessageService: LoadingMessageService) { }
    incCaption;
 
    sage;
    response;
    response2;
    response3;
    response4;

    spinToggle = false;
    ngOnInit() {
        this.myForm = new FormGroup({
            whateverField: new FormControl()
        });
    }

    @Input()
    subForm = {
        caption: null,
        caption2: null,
        showForm: false,
        requestType: '2',
        input: '',
    }
    errorModalMessage = "Error!";

    public update() {
        if (this.subForm.input == '' || this.subForm.input == null || this.subForm.input == undefined) {
            this.errorModalMessage = '"Dear Sage, I apologize for questioning you, but I do not think you intend leaving this message blank."';
            $("#errorModalAccountSettings").modal();
        }
        else {
            this.loadingMessageService.changeLoadingMessage('Revolving the Multiverse around you to customize your needs......');
            this.spinnerService.show();
            this.sage = this.apiAccountsService.updateAccount(this.subForm.requestType, this.subForm.input);
            let oldInput = localStorage.getItem(this.subForm.requestType);


            this.sage.subscribe((data) => {
                if (this.subForm.requestType == 'password') {
                    this.response = "Good News! Multiverse successfully revolved to your needs!";
                    this.response2 = "Here's the update: ";
                    this.response3 = "Password sucessfully changed.";

                    this.response4 = "(Please login again.)";
                    this.spinnerService.hide();
                    this.subForm.input = '';
                    $("#responseModal").modal();
                    $("#responseModal").on("hidden.bs.modal", function () {
                        $('#responseSubmit').click();
                    });
                }
                else {
                    localStorage.setItem(this.subForm.requestType, data['data'][this.subForm.requestType]);
                    this.response = "Good News! The Multiverse successfully revolved itself to your needs!"
                    this.response2 = "Here's the update: ";
                    this.response3 = "Old --- " + oldInput;
                    this.response4 = "New --- " + localStorage.getItem(this.subForm.requestType);
                    this.subForm.input = '';
                    this.spinnerService.hide();
                    $("#responseModal").modal();
                }
            });
        }
    }

    redirect() {
        this.router.navigate(['login']);
    }
}
