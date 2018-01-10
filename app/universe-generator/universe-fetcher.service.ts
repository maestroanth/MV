import { Injectable } from '@angular/core';
import { HttpModule, Headers, Http, Response } from '@angular/http';
import { SageUserService } from '../sage-user.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
//import { APIFetcherFormComponent} from './apifetcher-form/apifetcher-form.component';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UniverseFetcherService {
    private NASA_KEY = 'fwMu6AQOR7jmwOtQkPwqMUKyXFssJLRbk90caHor';
    private GMAIL_KEY = 'AIzaSyABHAdaAQrKCdZBg5y0i9UEp1RQfyk7Ef4';
    private GMAIL_OAUTH_KEY = '769416451298-nika55bcqu3ecgdh11t5fulmslodlcsp.apps.googleusercontent.com';
    private GMAIL_CLIENT_SECRET_KEY = 'U0Ds5vksMQm-7IlwDSFgDZMF';
    //private dataUrl = 'https://jsonplaceholder.typicode.com/posts';
    //private dataURL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=' + this.NASA_KEY;  //default URL
    //bad url requests can generate the "falsely Universe" card instead of an error message
    private dataURL = 'https://www.googleapis.com/gmail/v1/users/maestroanth%40gmail.com/profile?Access_token=' + this.GMAIL_OAUTH_KEY;

    constructor(private http: Http, private sageUserService: SageUserService) {

    }

    private headers = new Headers({
        //any custom header will cause the browser to send a pre-flight
        //'Access-Control-Allow-Origin': '*'
        //this.token = localStorage.getItem('special_access_token');
        //this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));
        //this.headers.set('Access-Control-Allow-Origin', '*');
    })

    token;
    response;
    url;

    //'Access-Control-Allow-Origin': '*',
    //'Access-Control-Allow-Method': 'GET',
    //'Content-Type': 'application/json', 
    //'Accept': 'application/json',
    public getOutsideData(url) {
        url = 'https://' + url;
        this.headers = new Headers({});//delete all headers so it doesn't send preflight
        this.response = this.http.get(url, { headers: this.headers })
            .map((res: Response) => this.response = res).retryWhen(attempts => attempts.zip(Observable.range(1, 4))
                .flatMap(([error, i]) => {
                    if (i > 3) {
                        return Observable.throw(error.json().error || 'Server error');
                    }
                    console.log('delay retry by ' + i + ' second(s)');
                    return Observable.timer(i * 3100)
                }));
        this.response.subscribe((data) => {
        }
            , err => this.sageUserService.sendError(err));
        //console.log("Local Race Variable: " + JSON.stringify(this.response));
        return this.response;

    }

    /***********************************************************************************************************************************
Get Keywords
***********************************************************************************************************************************/
    public getKeywords() {

        //console.log(sagename + password + realname);
        //1.
        this.url = environment.baseAPIUrl + 'api/keywords';//remember leaving a trailing slash screws up the options route with an error 301 (redirect) message
        let token = localStorage.getItem('access_token');

        this.headers.set('Authorization', 'Bearer ' + token.replace('"', ''));


        //2.
        this.response = this.http.get(this.url, { headers: this.headers })
            .map((res: Response) => this.response = res.json()).retryWhen(attempts => attempts.zip(Observable.range(1, 4))
                .flatMap(([error, i]) => {
                    if (i > 3) {
                        return Observable.throw(error.json().error || 'Server error');
                    }
                    console.log('delay retry by ' + i + ' second(s)');
                    return Observable.timer(i * 3100)
                }));
        this.response.subscribe((data) => {
        }
            , err => this.sageUserService.sendError(err));
        //console.log("Local Race Variable: " + JSON.stringify(this.response));
        return this.response;

    }/**deleteAccount(formType)**/

}
