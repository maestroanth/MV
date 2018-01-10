import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { UniverseFetcherService } from './universe-fetcher.service';
import { CardService } from '../card.service';
import { Router, NavigationExtras } from '@angular/router';
import { Universe } from '../universe';
import { UniverseCard } from '../universe-card';
import { Subscription } from 'rxjs/Subscription';
import { SageUserService } from '../sage-user.service';
import { Keyword } from './keyword';
import { Tally } from './tally';
import { Observable } from "rxjs/Rx";
import { Stage1FormComponent } from "./stage-1-form/stage-1-form.component";
import { StatusService } from "../status.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadingMessageService } from '../loading-message.service';

export class Get {
    url: string;
    type: string;
}

@Component({
    selector: 'app-universe-generator',
    templateUrl: './universe-generator.component.html',
    styleUrls: ['./universe-generator.component.css'],
    providers: [JsonPipe, UniverseFetcherService]
})


/*Abstract Logic Mapping For Generator Design

    Set-up: Have an optional access token parameter

    Three Stages:

    Energy will be = to $$$ and subscribed users get more daily energy or whatever to use.
    Extra Universes can be deleted for a partial energy refund to help avoid bitching.

    Users can enter in any url request

    Stage 1:
    A 'pre'-diagnosis of the url will comeback with an energy cost. Most Universes will cost about some arbitrary amount
    of energy (say 10).

    If a 'rare' url is entered then the comeback with an energy cost will be higher, but it is still gamble that a rare
    Universe isn't a guarantee.

    For rare url's I can either hand pick a few, or have some parsing logic behind that determines the rarity. Currently
    I'm thinking the former to keep in a DB table of some sort to at least keep track of the super rares.

    The point is, I want the 'rare' url's to rotate from time to time on a daily to monthly rotation (maybe even to the hour).
    I can even automate this. This stuff I may keep secret.

    Stage 2:
    User can adjust the odds by spending more Energy. 

    Stage 3:
    I do want parsing logic mainly for determining the final stats after the 'base' universe is selected.

    And after that give the user some flexibility in further adjusting the stats or moves at the cost of energy. After each stat
    upgrade 
    there will also be a separate probability of 'screwing up' the fine tuning which will result in a "Faulty Universe" and they
    lose the Universe.  This probability gets higher as the more upgraded the Universe becomes.
    *I can have the sage's Intuition influence the probabilty*

    The user can pay energy to 'reverse time' and re-roll the "Faulty Universe".
    They can do this up to 5 times. I may decide to have the 5th time be auto-success or auto-failure.

    If Universes were really high and resulted in faulty universes, I'll probably make them redeemable for higher energy, but never
    as much as they originally spent. Or I can give 'mark' the faulty universe for a 2nd chance to rebuild it with all the upgrades
    at a cheaper energy cost or something.

    A good rare universe should cost around $5.  A good common around $1. I can make also super rare ones possible where the market can decide through online trades.

    I'd like to make super rare universe cards that can be worth $100's too that costs $1000's to make or hours of playtime...

    How To Build:
    Method 1 (Keyword strategy):
    1. Create a keyword table in the DB with FK's to universes.

    2. Write some string parsing logic that scans the URL string and tallies up keywords.



    3. From those tallies, assigns probabilities to say the top 6 or 7 Universes. Show only the top few as pre-diagnosis.
    *I can have how many shown based off sage's intelligence*

    4. For Stage 3 


    Method 2 (Hand-picking URLS):
    1.  I'll just start with the URL https://penzu.com/ (a diary website).  What I can do is make it a base greater chance to result
    in "An emotional Universe" combined with method 1 to add to that base vastly upping the odds for it to show up.

    Current Issues as of 11/24/2017
    1. The api calls aren't hugely reliable, depending on order of responses, sometimes it tallies up the data, sometimes it doesn't.
    2. FIXED the preflight calls after first use but resetting the headers!!!!
*/



export class UniverseGeneratorComponent implements OnInit {
    constructor(private jsonPipe: JsonPipe, private universeFetcherService: UniverseFetcherService, private router: Router, private status: StatusService,
        private cardService: CardService, private universe: Universe, private universeCard: UniverseCard, private sageUserService: SageUserService,
        private spinnerService: Ng4LoadingSpinnerService, private loadingMessageService: LoadingMessageService) {
    }

    @ViewChild(Stage1FormComponent) stage1: Stage1FormComponent;//allows parent to see all child component crap; only other way is to use 'services' btw
    @ViewChild('modalTrigger') modalTrigger: ElementRef;

    ngOnInit() {
        //console.log(this.apiGetFetcherService.getData().subscribe(val => console.log(val)));
        this.stage1Form.availableEnergy = parseInt(localStorage.getItem('Energy'));
        this.status.changeStatus("Available Energy: " + localStorage.getItem('Energy'));
        console.log('Available Energy: ' + this.stage1Form.availableEnergy);
        $("#openingModal").modal();
        //this.modalTrigger.nativeElement.click();
        this.subscription = this.sageUserService.getError().subscribe(incomingError => {
            this.spinnerService.hide();
            this.buttonToggle = false;
            this.error = "Couldn't Load Data.";
        })//remember this does ALL error handling for this app
    }

    CORSInfo = false;

    stage1Form = {
        showForm: false,
        tallyList: new Array<Tally>(),
        topUniverses: new Array<Universe>(),
        cost: 10,
        faultyUniverse: 0,
        availableEnergy: 0,
        birthURL: "",
        showCostFaulty: true,
        //ready: Observable<any> = new Observable();
    }

    mainForm = true;
    title = 'Fill out this form to begin creating a universe from any website!';
    subTitle = "Remember there are no card sets in SOMV: Universe Generator. Every universe card you create will be unique just for you!";
    response;
    inputURL;
    inputType;
    energy;
    error;
    buttonToggle = false;
    //tallyList = new Array<Tally>();
    universes = new Array<Universe>();
    keywords = new Array<Keyword>();
    subscription = new Subscription;
    subscriptionForm = new Subscription;

    /*
    + 'Some sites may create incredibly rare universes that may have the laws of physics so finely-tuned that they even support intelligent life. Maybe even life that can exist without pain or suffering (take that GOD, ;P ) '
    + 'However, other universes could be just complete duds that get suck right back into their own moments of creation through having too strong of gravity or whatever.... '
    */

    tutorial = 'Here you can build your own unique universes by running any web request through the generator. '
    + 'Every web address creates a different universe from which you can then customize! (inspired by the Playstation game: Monster Rancher)'; 

    description = 'Are you the type of Sage that would like to create a morally perfect '
    + ' Universe where life lives infinitely in harmonic bliss? Or are you the type of Sage that believes life with perfect bliss would be far too boring and needs a '
    + ' "little evil" and "suffering" in order for it to be interesting?  Or maybe you are the type of Sage that says to hell with the laws of physics and desires to build a '
    + ' Universe where the laws are random and make no or limited sense! Or maybe you would like a Universe where stuff like "magic" or "divine intervention" ARE part of the '
    + ' laws of physics? '
    + ' The decisions are yours Sage, ' + localStorage.getItem('sagename') + ' of the Multiverse!!!!';


    /************************************************
    * Starts Everything on Button Click
    ***************************************************/
    showData() {
        if (this.inputURL) {
            if ( 4 < this.stage1Form.availableEnergy) {
                //this.subscription = 'Congratulations, a new Universe has been added to your Multiverse!' + this.universeFetcherService.getOutsideData(this.inputURL, this.inputType);
                console.log("**Note by Author (Sage Anth): ** -> By advanced \"String Theory\" I of course mean just some fancy regex parsing of strings...what do you think? A dumb little programmer like me would actually know REAL String Theory?! ;P ");
                this.mainForm = false;
                this.loadingMessageService.changeLoadingMessage('Breaking your website\'s data down into some basic building blocks for a New Universe.....');
                this.spinnerService.show();
                this.buttonToggle = true;
                this.subscription = this.universeFetcherService.getOutsideData(this.inputURL).subscribe(incomingData => {
                    //this.response = incomingData.text();
  
                    this.stage1Form.birthURL = this.inputURL;
                    this.genUniverseByKeyword(incomingData.text());
                    //this.loadingMessageService.cueModal('Stage 1 Modal Now Open');
                    
                }, (err) => { this.mainForm = true; this.spinnerService.hide(); this.error = err + ' - Please Make Sure You Have CORS Enabled '; });
            }
            else {
                this.error = 'The Multiverse says to you, "Dear Sage, I apologize, but it looks like you do not have the Energy required to make a Universe!"';
            }
        }
        else {
            this.error = 'Please enter URL';
            this.spinnerService.hide();
            this.buttonToggle = false;
            //show error
        }
        //console.log(this.someData);
        //let parsingData = JSON.stringify(this.someData);
        //JSON.parse(this.returnData);
    }
    /************************************************
    * Parses HTML string and compares to keyword DB
    ***************************************************/
    genUniverseByKeyword(inputData) {
        
        this.stage1Form.tallyList = [];

        this.cardService.getAllUniverses().subscribe(incomingUniverses => {
            this.universes = incomingUniverses;
            for (let i = 0; i < this.universes.length; i++) {
                let tally = new Tally;
                tally['FK'] = this.universes[i]['id'];
                tally['tally'] = 0;
                this.stage1Form.tallyList.push(tally);
                //console.log('Tally: ' + this.tallyList[i]['FK']);

            }
            this.universeFetcherService.getKeywords().subscribe(incomingKeywords => {
                this.keywords = incomingKeywords;
                let sanitizedString = inputData.replace(/\W/g, ' ');
                sanitizedString = sanitizedString.replace(/[0-9]/g, '');
                sanitizedString = sanitizedString.toLowerCase();
                //console.log('String: ' + sanitizedString);

                let words = sanitizedString.split(" ");
                for (let i = 0; i < words.length; i++) {
                    words[i] = words[i].trim();
                    //match it to a parse section of the string
                    for (let j = 0; j < this.keywords.length; j++) {
                        this.keywords[j]['keyword'] = this.keywords[j]['keyword'].trim();
                        if (words[i] == this.keywords[j]['keyword']) {
                            // console.log("Found Match!: " + words[i]);

                            //add tally
                            for (let k = 0; k < this.stage1Form.tallyList.length; k++) {
                                //console.log(this.tallyList[k]['FK'] + 'keyword FK' + this.keywords[j]['FK']);

                                if (this.stage1Form.tallyList[k]['FK'] == this.keywords[j]['FK']) {
                                    this.stage1Form.tallyList[k]['tally']++;
                                    //console.log("added tally");
                                    //console.log("Added tally to FK: " + this.tallyList[k]['FK'] + " Tally Count: " + this.tallyList[k]['tally'] + " For Matching Word: " + words[i]);
                                }
                            }

                        }
                    }
                    this.response = '';
                    this.buttonToggle = false;
                    


  
                }
                this.setTopUniverses();
                this.stage1.tallyToPercent();
                this.stage1Form.showForm = true;
                this.spinnerService.hide();
                $("#openingModal").modal();
            });//sub 2
        });//sub 1

    }






    /************************************************
    * To Test Output
    ***************************************************/
    outputTallyCount(){
        this.response = '';
        for (let l = 0; l < this.stage1Form.tallyList.length; l++) {
            console.log("Tally FK: " + this.stage1Form.tallyList[l]['FK']);
            console.log("Tally Number: " + this.stage1Form.tallyList[l]['tally']);
            this.response = this.response + " Tally FK: " + this.stage1Form.tallyList[l]['FK'] + " Tally Number: " + this.stage1Form.tallyList[l]['tally'] + ' ::';
        }
    }
    /************************************************
    * Sets top amount
    ***************************************************/
    setTopUniverses(){
        let topUniverses = new Array<Universe>();
        let numberOfTopUniverses = 3;

        /*
        * Add Custom Multiplier to Tallies (so far the multiplier is all even, but later on I may want to weight the odds)
        */
        for (let m = 0; m < this.stage1Form.tallyList.length;  m++) {
            for (let n = 0; n < this.universes.length; n++) {
                if (this.universes[n]['id'] == this.stage1Form.tallyList[m]['FK']) {
                    this.stage1Form.tallyList[m]['tally'] = this.stage1Form.tallyList[m]['tally'] * this.universes[n]['Multiplier'];
                }

            }
        }

        /*
        *Sort Tallies
        */

        for (var i = 0; i < this.stage1Form.tallyList.length; i++) {

            for (var j = i + 1; j < this.stage1Form.tallyList.length; j++) {
                if (this.stage1Form.tallyList[i]['tally'] < this.stage1Form.tallyList[j]['tally']) {
                    var temp = this.stage1Form.tallyList[i];
                    this.stage1Form.tallyList[i]= this.stage1Form.tallyList[j];
                    this.stage1Form.tallyList[j] = temp;
                }

            }
        }

        /*
        * Setting Objects from tally count to send to stage1Form. This bit of code assumes the top 3 are already known (in descending order) given the bubblesort above
        */
        for (let k = 0; k < numberOfTopUniverses; k++) {
            for (let l = 0; l < this.universes.length; l++) {
                if (this.universes[l]['id'] == this.stage1Form.tallyList[k]['FK']) {
                    this.stage1Form.topUniverses.push(this.universes[l]);
                }

            }
        }
    }

    public CORSInfoToggle() {
        if (this.CORSInfo == false) {
            this.CORSInfo = true;
        }
        else {
            this.CORSInfo = false;
        }

    }
}