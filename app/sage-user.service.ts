import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { SageAccount } from './sage-account';
import { environment } from '../environments/environment';
import { HttpModule, Headers, Http, Response } from '@angular/http';
import { APIAccountsService } from './api-accounts.service';
import { Sage } from './sage';
import { Race } from './race';


@Injectable()
export class SageUserService {

    constructor(private http: Http) { }

    private error = new Subject<any>();
    private sageSubject = new Subject<SageAccount>();

    sendSage(sage: SageAccount) {
        //console.log('sendSage() ' + JSON.stringify(sage));
        this.sageSubject.next(sage);
    }

    clearSage() {
        this.sageSubject.next();
    }

    getSage(): Observable<any> {
        //console.log('getSage() ' + JSON.stringify(this.sageSubject.asObservable));
        return this.sageSubject.asObservable();
    }



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


    private response;
    private headers = new Headers({
        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json',
    })
    token;
    url;
    sage = new Sage;
    race = new Race;
    


    public getRaceInfo(raceID) {

        //1. Get Race Data
        //console.log("Current Auth Token: " + localStorage.getItem('access_token'));
        this.token = localStorage.getItem('access_token');
        this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));

        this.url = environment.baseAPIUrl + 'api/race/' + raceID;


        this.response = this.http.get(this.url, { headers: this.headers })
            .map((res: Response) => this.response = res.json()).retryWhen(attempts => attempts.zip(Observable.range(1, 4))
                .flatMap(([error, i]) => {
                    if (i > 3) {
                        return Observable.throw(error.json().error || 'Server error');
                    }
                    console.log('delay retry by ' + i + ' second(s)');
                    return Observable.timer(i * 100)
                }));
        this.response.subscribe((data) => {//the subsciption is mainly just to return the error
            this.race = data;
            this.setLocalRaceStorage(this.race);
        }
            , err => this.sendError(err));
        //console.log("Local Race Variable: " + JSON.stringify(this.response));
        return this.response;
    }

    public getTooltipInfo() {

        //1. Get Tooltip Data
        //console.log("Current Auth Token: " + localStorage.getItem('access_token'));
        this.token = localStorage.getItem('access_token');
        this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));
        //this.tipCategoryID = 1;
        this.url = environment.baseAPIUrl + 'api/tooltips'


        this.response = this.http.get(this.url, { headers: this.headers })
            .map((res: Response) => this.response = res.json()).retryWhen(attempts => attempts.zip(Observable.range(1, 4))
                .flatMap(([error, i]) => {
                    if (i > 3) {
                        return Observable.throw(error.json().error || 'Server error');
                    }
                    console.log('delay retry by ' + i + ' second(s)');
                    return Observable.timer(i * 100)
                }));
        this.response.subscribe((data) => {//the subsciption is mainly just to return the error
            // console.log('observing Tooltip: ' + JSON.stringify(this.response));
        }
            , err => this.sendError(err));
        //console.log("Local Race Variable: " + JSON.stringify(this.response));
        return this.response;
    }


    /*Sage Storage*/
    public setLocalSageStorage(sage: Sage) {

        localStorage.setItem('Intuition', sage.Intuition);
        localStorage.setItem('Ingenuity', sage.Ingenuity);
        localStorage.setItem('Inquisitiveness', sage.Inquisitiveness);
        localStorage.setItem('Insanity_Control', sage.Insanity_Control);
        localStorage.setItem('Intelligence', sage.Intelligence);
        localStorage.setItem('Invigoration', sage.Invigoration);
        localStorage.setItem('Chosen_Image', sage.Chosen_Image);
        localStorage.setItem('FK_Race', sage.FK_Race);
        localStorage.setItem('Energy', sage.Energy);
        localStorage.setItem('XP', sage.XP);
        localStorage.setItem('Level', sage.Level);
        localStorage.setItem('Sage_Created', sage.Sage_Created);
        localStorage.setItem('Personality', sage.Personality);
        console.log("SET Sage's Full Account Info: " + JSON.stringify(sage));
    }


    public getLocalSageStorage() {
        if (localStorage.getItem('sage_id')) {
            this.sage.Intuition = localStorage.getItem('Intuition');
            this.sage.Ingenuity = localStorage.getItem('Ingenuity');
            this.sage.Inquisitiveness = localStorage.getItem('Inquisitiveness');
            this.sage.Insanity_Control = localStorage.getItem('Insanity_Control');
            this.sage.Intelligence = localStorage.getItem('Intelligence');
            this.sage.Invigoration = localStorage.getItem('Invigoration');
            this.sage.Chosen_Image = localStorage.getItem('Chosen_Image');
            this.sage.FK_Race = localStorage.getItem('FK_Race');
            this.sage.Energy = localStorage.getItem('Energy');
            this.sage.XP = localStorage.getItem('XP');
            this.sage.Level = localStorage.getItem('Level');
            this.sage.Personality = localStorage.getItem('Personality');
            this.sage.Sage_Created = localStorage.getItem('Sage_Created');
            console.log("GET Sage's Full Account Info: " + JSON.stringify(this.sage));
            console.log("Sage's Full Account Info: " + JSON.stringify(this.sage));
            return this.sage;
        }
        else {

            this.response = 'No Sage Data Found: Please make sure user is Logged in!';
            this.sendError(this.response);
            return this.response;
        }

    }

    /*Race Storage*/
    public setLocalRaceStorage(race: Race) {

        localStorage.setItem('birth_universe', race.birth_universe);
        localStorage.setItem('race_name', race.race_name);
        localStorage.setItem('racial_bonuses', race.racial_bonuses);
        localStorage.setItem('description', race.description);
        localStorage.setItem('starting_personality', race.starting_personality);
        localStorage.setItem('dimensional_wake', race.dimensional_wake);
        localStorage.setItem('is_metaphysical', race.is_metaphysical);
        console.log("Race's Full Account Info: " + JSON.stringify(race));
        console.log("SET Races's Full Account Info: " + JSON.stringify(race));
    }

    public getLocalRaceStorage() {
        if (localStorage.getItem('FK_Race')) {
            this.race.birth_universe = localStorage.getItem('birth_universe');
            this.race.race_name = localStorage.getItem('race_name');
            this.race.racial_bonuses = localStorage.getItem('racial_bonuses');
            this.race.description = localStorage.getItem('description');
            this.race.dimensional_wake = localStorage.getItem('dimensional_wake');
            this.race.is_metaphysical = localStorage.getItem('is_metaphysical');
            console.log("GET Races's Full Account Info: " + JSON.stringify(this.race));
            return this.race;
        }
        else {
            this.response = 'No Sage Data Found: Please make sure user is Logged in!';
            this.sendError(this.response);
            return this.response;
        }

    }

}
