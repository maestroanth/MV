import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpModule, Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { Race } from '../race';
import { Sage } from '../sage';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class SageCreationService {

    constructor(private http: Http, private router: Router, private spinnerService: Ng4LoadingSpinnerService) { }

  private error = new Subject<any>();
  private responseToken;
  private response;
  private race = new Race;
  private tipCategoryID;
  private headers = new Headers({
      'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json',
  })
  private url;
  private token;





  public sendError(error: Response) {
      console.log("In Sage Creation Service: " + JSON.stringify(error));
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

  public sendFinalSageInfo(sageData: Sage) {
      this.spinnerService.show();
      //1. Get Tooltip Data
      //console.log("Current Auth Token: " + localStorage.getItem('access_token'));
      this.token = localStorage.getItem('access_token');
      this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));
      this.url = environment.baseAPIUrl + 'api/new-sage/' + localStorage.getItem('sage_id');


      this.response = this.http.post(this.url, JSON.stringify(sageData),  { headers: this.headers })
          .map((res: Response) => this.response = res.json()).retryWhen(attempts => attempts.zip(Observable.range(1, 4))
              .flatMap(([error, i]) => {
                  if (i > 3) {
                      return Observable.throw(error.json().error || 'Server error');
                  }
                  console.log('delay retry by ' + i + ' second(s)');
                  return Observable.timer(i * 100)
              }));
      this.response.subscribe((data) => {//the subsciption is mainly just to return the error
      }
          , (err) => { this.spinnerService.hide(); this.sendError(err); });
      //console.log("Local Race Variable: " + JSON.stringify(this.response));
      return this.response;
  }
}
