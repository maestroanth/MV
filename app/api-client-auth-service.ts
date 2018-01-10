import { HttpModule, Headers, Http, Response } from '@angular/http';
import { environment } from '../environments/environment'; //this is to get baseAPIURLtokenURL
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


@Injectable()//this lets parameters be injected!
export class APIClientAuthService {
    //private apiClientToken = new APIToken;
    private headers = new Headers({
        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json',
    })

    private apiCCClient = {

        grant_type: environment.grantType,//grant_type is under scored because it has to match json body
        client_id: environment.appID,
        client_secret: environment.appSecret,
        scope: environment.scope,

    }

    private apiPasswordClient = {
        grant_type: "password",
        client_id: environment.appID,
        client_secret: environment.appSecret,
        username: null,
        password: null,
        scope: "*"
    }
    private postResponse;
    private token;
    
    constructor(private http: Http) {}


    /**********************************************************************************************************
     * Generates authorization token from environment variables
     ************************************************************************************************************/
    public getClientToken() {
        
        this.token = this.http.post(environment.tokenURL, JSON.stringify(this.apiCCClient), { headers: this.headers })
            .map((res: Response) => this.postResponse = res.json()).retryWhen((errors) => errors.delay(1000).take(5));//10 retries when there are errors evades the whole preflight crap!!!! ;DDDD

        return this.token;
    }//**getClientToken()**//


    public getPasswordToken(sageName, password) {
        this.apiPasswordClient.username = sageName;
        this.apiPasswordClient.password = password;
        console.log('to send to api: ' + JSON.stringify(this.apiPasswordClient));
        this.token = this.http.post(environment.tokenURL, JSON.stringify(this.apiPasswordClient), { headers: this.headers })
            .map((res: Response) => this.postResponse = res.json()).retryWhen(attempts =>  attempts.zip(Observable.range(1, 4))
                    .flatMap(([error, i]) => {
                        if (i > 3) {
                            return Observable.throw(error.json().error || 'Server error');
                        }
                        console.log('delay retry by ' + i + ' second(s)');
                        return Observable.timer(i * 100)
                    }));//10 retries when there are errors evades the whole preflight crap!!!! ;DDDD

        return this.token;
    }//**getClientToken()**//

}