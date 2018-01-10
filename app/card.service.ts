import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { HttpModule, Headers, Http, Response } from '@angular/http';
import { environment } from '../environments/environment';
import { SageUserService } from './sage-user.service';
import { Universe } from './universe';
import { UniverseCard } from './universe-card';
import { Force } from './force';
import { Concept } from './concept';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadingMessageService } from './loading-message.service';

@Injectable()
export class CardService {

    constructor(private http: Http, private sageUserService: SageUserService, private universe: Universe, private universeCard: UniverseCard,
        private spinnerService: Ng4LoadingSpinnerService, private loadingMessageService: LoadingMessageService) { }

  private response;
  private headers = new Headers({
      'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json',
  })
  token;
  url;
  universeCardCollection = [UniverseCard];


  public getMovesTable() {
      this.url = environment.baseAPIUrl + 'api/moves';
      this.runGetRequest();
      return this.response;
  }

  public getCardCollection(sageID) {
      this.url = environment.baseAPIUrl + 'api/collection/' + sageID;
      this.runGetRequest();
      return this.response;
  }

  public getUniverseInfo(universeID) {
      this.url = environment.baseAPIUrl + 'api/universe-category/' + universeID;
      this.runGetRequest();
      return this.response;
  }

  public getAllUniverses() {
      this.url = environment.baseAPIUrl + 'api/universes';
      this.runGetRequest();
      return this.response;
  }

  public postNewCard(universeCard: UniverseCard, userID) {

      //1. Get Universe Data
      //console.log("Current Auth Token: " + localStorage.getItem('access_token'));
      this.token = localStorage.getItem('access_token');
      this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));

      this.url = environment.baseAPIUrl + 'api/generate-card/' + userID;

      console.log('card to be inserted: ' + JSON.stringify(universeCard));
      this.response = this.http.post(this.url, JSON.stringify(universeCard), { headers: this.headers })
          .map((res: Response) => this.response = res.json()).retryWhen(attempts => attempts.zip(Observable.range(1, 4))
              .flatMap(([error, i]) => {
                  if (i > 3) {
                      this.sageUserService.sendError(error);//still need to test if this works
                      return Observable.throw(error.json().error || 'Server error');
                  }
                  console.log('delay retry by ' + i + ' second(s)');
                  return Observable.timer(i * 100)
              }));

      //console.log("Local Race Variable: " + JSON.stringify(this.response));
      return this.response;
  }

  public destroyCards(universeCards: UniverseCard[], userID) {

      //1. Get Universe Data
      //console.log("Current Auth Token: " + localStorage.getItem('access_token'));
      this.token = localStorage.getItem('access_token');
      this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));

      this.url = environment.baseAPIUrl + 'api/destroy-cards/' + userID;

      console.log('cards to be destroyed: ' + JSON.stringify(universeCards));
      this.response = this.http.post(this.url, JSON.stringify(universeCards), { headers: this.headers })
          .map((res: Response) => this.response = res.json()).retryWhen(attempts => attempts.zip(Observable.range(1, 4))
              .flatMap(([error, i]) => {
                  if (i > 3) {
                      this.sageUserService.sendError(error);//still need to test if this works
                      return Observable.throw(error.json().error || 'Server error');
                  }
                  console.log('delay retry by ' + i + ' second(s)');
                  return Observable.timer(i * 100)
              }));

      //console.log("Local Race Variable: " + JSON.stringify(this.response));
      return this.response;
  }

  public destroyCard(universeCard: UniverseCard, userID) {

      //1. Get Universe Data
      //console.log("Current Auth Token: " + localStorage.getItem('access_token'));
      this.token = localStorage.getItem('access_token');
      this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));

      this.url = environment.baseAPIUrl + 'api/destroy-card/' + userID;

      console.log('cards to be destroyed: ' + JSON.stringify(universeCard));
      this.response = this.http.post(this.url, JSON.stringify(universeCard), { headers: this.headers })
          .map((res: Response) => this.response = res.json()).retryWhen(attempts => attempts.zip(Observable.range(1, 4))
              .flatMap(([error, i]) => {
                  if (i > 3) {
                      this.sageUserService.sendError(error);//still need to test if this works
                      return Observable.throw(error.json().error || 'Server error');
                  }
                  console.log('delay retry by ' + i + ' second(s)');
                  return Observable.timer(i * 100)
              }));

      //console.log("Local Race Variable: " + JSON.stringify(this.response));
      return this.response;
  }

  public updateUniverseCardNameDescription(universeCard: UniverseCard, cardID) {
      this.url = environment.baseAPIUrl + 'api/universes';
      this.token = localStorage.getItem('access_token');
      this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));


      this.url = environment.baseAPIUrl + 'api/update-card/' + cardID;
      console.log('card to be updated: ' + JSON.stringify(universeCard));

      this.response = this.http.post(this.url, JSON.stringify(universeCard), { headers: this.headers })
          .map((res: Response) => this.response = res.json()).retryWhen(attempts => attempts.zip(Observable.range(1, 4))
              .flatMap(([error, i]) => {
                  if (i > 3) {
                      this.sageUserService.sendError(error);//still need to test if this works
                      return Observable.throw(error.json().error || 'Server error');
                  }
                  console.log('delay retry by ' + i + ' second(s)');
                  return Observable.timer(i * 100)
              }));

      /*
      this.response.subscribe((data) => {
          this.universeCard = data;
          console.log(JSON.stringify(this.universeCard));
          //this.setLocalRaceStorage(this.universe);
      }
          , err => this.sageUserService.sendError(err));
      */
      //console.log("Local Race Variable: " + JSON.stringify(this.response));
      return this.response;
  }

  public runGetRequest() {
      this.token = localStorage.getItem('access_token');
      this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));

      this.response = this.http.get(this.url, { headers: this.headers })
          .map((res: Response) => this.response = res.json()).retryWhen(attempts => attempts.zip(Observable.range(1, 4))
              .flatMap(([error, i]) => {
                  if (i > 3) {
                      this.sageUserService.sendError(error);//still need to test if this works
                      return Observable.throw(error.json().error || 'Server error');
                  }
                  console.log('delay retry by ' + i + ' second(s)');
                  return Observable.timer(i * 3100)
              }));
      /*
      this.response.subscribe((data) => {
      }
          , err => this.sageUserService.sendError(err));
      */
      //console.log("Local Race Variable: " + JSON.stringify(this.response));

  }
}

