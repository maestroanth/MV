import { Injectable } from '@angular/core';
import { HttpModule, Headers, Http, Response } from '@angular/http';
import { SageAccount } from './sage-account';//remember the damn dot './' or it won't detect to current folder
import { environment } from '../environments/environment';
import { APIClientAuthService } from './api-client-auth-service';
import { Router, NavigationExtras } from '@angular/router';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { SageUserService } from './sage-user.service';
import { StatusService } from "./status.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class APIAccountsService {

    private responseToken;
    private response;
    private headers = new Headers({
        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json',
    })
    //CORS NOTE: Make sure you add "Access-Control-Allow-Origin: *" as a header or it won't work!!!!!!

    constructor(private http: Http, private router: Router, private apiClientAuthService: APIClientAuthService, private sageUserService: SageUserService,
        private status: StatusService, private spinnerService: Ng4LoadingSpinnerService) {


    }
    //public error$: Observable<string> = this.testSubject.asObservable();
    private url;
    private postResponse;
    private sage;
    private responseData;
    private apiLoginToken;
    private apiCCToken;
    private error = new Subject<any>();
    private sageRequest;

    private apiPasswordClient = {
        grant_type: "password",
        client_id: environment.appID,
        client_secret: environment.appSecret,
        sagename: null,
        password: null,
        scope: "*"
    }

  
    public sendError(error: Response) {
        console.log("In API Accounts Service: " + JSON.stringify(error));
        //console.log('sendSage() ' + JSON.stringify(sage));
        this.error.next(error);
    }

    public clearError() {
        this.error.next();
    }
    
    public getError(): Observable<any> {
        //console.log('getSage() ' + JSON.stringify(this.sageSubject.asObservable));
        return this.error.asObservable();
    }
    
     /**********************************************************************************************************
     * 1. Generates API PASSWORD Token 2. THEN attaches headers 3. Gets User Info 4. THEN sets localStorage and navigates to Home Page
     ************************************************************************************************************/

    public login(sageName, password) {
        this.spinnerService.show();
        console.log('SageName to LOGIN: '+ sageName + 'PASSWORD TO LOGIN: ' + password);
        //1.
        this.apiClientAuthService.getPasswordToken(sageName, password).subscribe((data) => {//do all code inside subscribes => means callback not foreach like I originally thought: 'dwee...'*whacks forehead*

            this.responseData = data;
    
            //2.
            this.apiLoginToken = this.responseData;
            //console.log('my LOGIN token: ' + JSON.stringify(this.apiLoginToken));
            localStorage.setItem('access_token', null);//just in case if something was in there.
            localStorage.setItem('access_token', JSON.stringify(this.apiLoginToken['access_token']));
 
            this.headers.set('Authorization', 'Bearer ' + this.apiLoginToken['access_token']);
            this.url = environment.baseAPIUrl + 'api/user';
            //console.log('headers being sent: ' + JSON.stringify(this.headers));
            //console.log('url being sent: ' + this.url);

            //3.
            this.response = this.http.get(this.url, { headers: this.headers })
                .map((res: Response) => this.sage = res.json()).retryWhen(attempts => attempts.zip(Observable.range(1, 4))
                    .flatMap(([error, i]) => {
                        if (i > 3) {
                            return Observable.throw(error.json().error || 'Server error');
                        }
                        console.log('delay retry by ' + i + ' second(s)');
                        return Observable.timer(i * 100)
                    }));
            this.response.subscribe((data) => {

                this.sage = data;
                //4. Account Storage
                localStorage.setItem('sage_id', this.sage.id);
                localStorage.setItem('sagename', this.sage.sagename);
                localStorage.setItem('realname', this.sage.realname);
                localStorage.setItem('email', this.sage.email);
                localStorage.setItem('password', this.sage.password);//only set password here. 

                //5. Sage Profile Storage
                localStorage.setItem('Sage_Created', this.sage.Sage_Created);
                let sageCreated = parseInt(localStorage.getItem('Sage_Created'));
                if (sageCreated == 1) {
                    this.sageUserService.setLocalSageStorage(this.sage);
                    this.status.changeStatus("Welcome to the Multiverse, " + localStorage.getItem('sagename') + "!");
                    console.log('set energy: ' + localStorage.getItem('Energy'));

                }
                //console.log("Current Auth Token: " + localStorage.getItem['access_token']);
                    //console.log("SAGE CREATED TEST: " + localStorage.getItem('Sage_Created'));
                this.router.navigate(['sagehome', this.sage.id]);//has to navigate and THEN trigger the broadcast singleton);
                console.log('observing ' + JSON.stringify(this.sage));
                this.spinnerService.hide();
            }
                , (err) => { this.spinnerService.hide();  this.sendError(err); });

        }
            , (err) => { this.spinnerService.hide(); this.sendError(err); });

    }//**login(data: SageAccount, token)**//

     /***********************************************************************************************************************************
    * 1. Generate CCToken 2. THEN sets as header and send POST Request 3. THEN Logs User In using same login function
    ***********************************************************************************************************************************/
    public createAccount(sageData: SageAccount) {
        this.spinnerService.show();
        //1.
        this.apiClientAuthService.getClientToken().subscribe((data) => {


            this.apiCCToken = data;
            localStorage.setItem('access_token', '');//erases anything there first
            localStorage.setItem('access_token', this.apiCCToken);

            //2.
            console.log("Access CC Token " + this.apiCCToken['access_token']);
            this.headers.set('Authorization', 'Bearer ' + this.apiCCToken['access_token']);
            this.url = environment.baseAPIUrl + 'api/account/post';

            this.sage = this.http.post(this.url, JSON.stringify(sageData), { headers: this.headers })
                .map((res: Response) => this.sage = res.json()).retryWhen(attempts =>  attempts.zip(Observable.range(1, 4))
                    .flatMap(([error, i]) => {
                        if (i > 3) {
                            return Observable.throw(error.json().error || 'Server error');
                        }
                        console.log('delay retry by ' + i + ' second(s)');
                        return Observable.timer(i * 100)
                    }));//10 retries when there are errors evades the whole preflight crap!!!! ;DDDD

            this.sage.subscribe(data => {
                //console.log("data: " + data);
                //3.
                /*Caveat here:  The data comes back with the password hashed, so I cannot use the return data to jump straight into login.
                Have to use exactly what they entered and passed into this function*/
                this.login(sageData.sagename, sageData.password);
            }
                , (err) => { this.spinnerService.hide(); this.sendError(err); });

        }
            , (err) => { this.spinnerService.hide(); this.sendError(err); });
    }//**createAccount(data: SageAccount, token)**//




    /***********************************************************************************************************************************
    * 1. Build custom request JSON string 2. make the update!
    ***********************************************************************************************************************************/

    public updateAccount(formType, input) {

        //1.
        let request = '{"sagename": "' + localStorage.getItem('sagename') + '", "' + formType + '": "' + input + '"}';
        this.url = environment.baseAPIUrl + 'api/account/edit/' + localStorage.getItem('sage_id');
        let token = localStorage.getItem('access_token');

        this.headers.set('Authorization', 'Bearer ' + token.replace('"', ''));
        console.log(request);

        //2.
        this.sage = this.http.post(this.url, request, { headers: this.headers })
            .map((res: Response) => this.sage = res.json()).retryWhen(errors => errors.delay(1000).take(5));//10 retries when there are errors evades the whole preflight crap!!!! ;DDDD

        return this.sage;
    }/**updateAccount(formType)**/

        /***********************************************************************************************************************************
    * 1. Build custom request JSON string 2. make the deletion!
    ***********************************************************************************************************************************/
    public deleteAccount(sagename, password, realname) {

        console.log(sagename + password + realname);
        //1.
        let request = '{"sagename": "' + sagename + '", "password": "' + password + '", "realname": "' + realname + '"}';
        this.url = environment.baseAPIUrl + 'api/account/delete/' + localStorage.getItem('sage_id');
        let token = localStorage.getItem('access_token');
        
        this.headers.set('Authorization', 'Bearer ' + token.replace('"', ''));

        console.log(request);
        //2.
        this.sage = this.http.post(this.url, request, { headers: this.headers })
            .map((res: Response) => this.sage = res.json()).retryWhen(attempts => attempts.zip(Observable.range(1, 4))
                .flatMap(([error, i]) => {
                    if (i > 3) {
                        return Observable.throw(error.json().error || 'Server error');
                    }
                    console.log('delay retry by ' + i + ' second(s)');
                    return Observable.timer(i * 100)
                }));//10 retries when there are errors evades the whole preflight crap!!!! ;DDDD

        return this.sage;
    }/**deleteAccount(formType)**/
    /*
    private getRetry(errors: Observable<Response>): Observable<any> {
        
        return errors.mergeMap(error => {
            
            if (error.status === 500) {
                console.log(error);
                // Add an authorization header, perhaps.
                // ...
                // Emit anything (the error instance, for example) to retry:
                return Observable.of(error);

            } else {

                // Throw the error to give up retrying:
                return Observable.throw(error);
            }
        });
    }
    */
    public handleError(error: Response) {
        //console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }




    public sageCreatedCheck() {
        //will check if sage profile has been created
    }


}
