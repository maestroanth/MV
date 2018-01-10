import { Component, Injectable, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Race } from '../race';
import { Sage } from '../sage';
import { Tooltip } from '../tooltip';
import { environment } from '../../environments/environment';
import { SageCreationService } from './sage-creation.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationExtras } from '@angular/router';
import { NgStyle } from '@angular/common';
import { SageUserService } from '../sage-user.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadingMessageService } from '../loading-message.service';


@Component({
    selector: 'app-sage-creation',
    templateUrl: './sage-creation.component.html',
    styleUrls: ['./sage-creation.component.css'],
    providers: [Race, SageCreationService]
})


export class SageCreationComponent implements OnInit {
    //all the main form does is the error reporting..
    constructor(private loadingMessageService: LoadingMessageService, private spinnerService: Ng4LoadingSpinnerService,
        private sageUserService: SageUserService, private sageCreationService: SageCreationService, private router:
            Router, public race: Race, private tooltip: Tooltip) {
        this.loadingMessageService.changeLoadingMessage('Loading Creation Page...');
        this.spinnerService.show();
        this.race.race_name = "Loading Race...";

        this.subscription = this.sageUserService.getRaceInfo(environment.minRaceID).subscribe(incomingRace => {
            this.race = incomingRace;

            this.minRaceIntuition = parseInt(this.race.base_intuition);
            this.minRaceIngenuity = parseInt(this.race.base_ingenuity);
            this.minRaceInquisitiveness = parseInt(this.race.base_inquisition);
            this.minRaceIntelligence = parseInt(this.race.base_intelligence);
            this.minRaceInvigoration = parseInt(this.race.base_invigoration);
            this.minRaceInsanityControl = parseInt(this.race.base_insanity_control);
            this.maxBonusPoints = parseInt(this.race.bonus_points_at_creation);
            this.imageURL = environment.baseImagePath + this.race.image_1;

            this.spinnerService.hide();
            $("#openingModal").modal();
            // this.isLocked = this.race.is_locked;

        });

        this.subscription2 = this.sageUserService.getTooltipInfo().subscribe(incomingTip => {
            this.tooltip = incomingTip;

            this.tipIntuition = this.tooltip[0].description;
            console.log("TIP" + this.tipIntuition);

            this.tipInquisitiveness = this.tooltip[1].description;


            this.tipIntelligence = this.tooltip[2].description;


            this.tipIngenuity = this.tooltip[3].description;


            this.tipInsanityControl = this.tooltip[4].description;


            this.tipInvigoration = this.tooltip[5].description;

            this.tipPrimaryAttributes = this.tooltip[6].description;

            this.tipEnergy = this.tooltip[7].description;

            this.tipDimensionalWake = this.tooltip[8].description;

            this.tipBonusPointsAtCreation = this.tooltip[9].description;

        });

    }
    subscription = new Subscription;
    subscription2 = new Subscription;

    minRaceIntuition;
    minRaceIngenuity;
    minRaceInquisitiveness;
    minRaceIntelligence;
    minRaceInvigoration;
    minRaceInsanityControl;
    maxBonusPoints;

    tipIntuition;
    tipIntelligence;
    tipIngenuity;
    tipInvigoration;
    tipInsanityControl;
    tipInquisitiveness;
    tipPrimaryAttributes;
    tipEnergy;
    tipDimensionalWake;
    tipBonusPointsAtCreation;
    errorModalMessage = "Error";
    isValid = false;
    title = "Choose Your Race";
    subTitle = "Primary Attributes";
    subTitle2 = "Approximate 3D Image Representation";
    attributeDescription = "Physical attributes we value such as strength and dexterity are not attributes relevant to a Sage of the Multiverse.  However, the six most important attributes that do matter to a Sage's character while transversing the Multiverse are the six \"In\'s\": Intuition, Inquisitiveness, Ingenuity, Invigoration, Intelligence, and finally the ability to not go Insane from the phenomena! Hover your cursor below (or hold your thumb over) the attribute and read the tooltip for a more complete in-game description.";
    raceID;
    imageURL;
    response;
    sage = new Sage;
    spinToggle = false;
    spinToggle2 = false;
    // isLocked;

    maxRaceID = environment.maxRaceID;
    minRaceID = environment.minRaceID;
    currentRaceID = environment.minRaceID;
    whichImage = 1;

    subscriptionError = new Subscription;
    title2 = 'Create Your Multiverse Sage!';
    error;

    ngOnInit() {
        this.subscriptionError = this.sageCreationService.getError().subscribe(incomingError => {
            this.errorModalMessage = '"Dear Sage, I apologize, but I couldn\'t Load or Send Race Data. Please Make Sure You Are Logged In.';
            $("#errorModal").modal();
        })
    }


    public nextRace() {

        let currentRaceID = this.currentRaceID + 1;

        //1. If the counter exceeds the max ID there is reset it to minID.
        if (currentRaceID > this.maxRaceID) {
            this.currentRaceID = this.minRaceID;
        }
        else {
            this.currentRaceID = this.currentRaceID + 1
        }

        this.switchRace();
    }


    public previousRace() {
        let currentRaceID = this.currentRaceID - 1;
        //console.log("Current RaceID: " + JSON.stringify(currentRaceID));
        //1. If the counter exceeds the min ID there is reset it to maxID.
        if (currentRaceID < this.minRaceID) {
            this.currentRaceID = this.maxRaceID;
        }
        else {
            this.currentRaceID = this.currentRaceID - 1
        }
        this.switchRace();

    }


    public switchRace() {
        this.loadingMessageService.changeLoadingMessage('Generating a New Consciousness...');
        this.spinnerService.show();
        console.log("RaceID: " + JSON.stringify(this.currentRaceID));//need to subscribe HERE to show this
        this.subscription = this.sageUserService.getRaceInfo(this.currentRaceID).subscribe(incomingRace => {
    
           
            this.race = incomingRace;
            this.whichImage = 1;
            this.imageURL = environment.baseImagePath + this.race.image_1;
         
            this.minRaceIntuition = parseInt(this.race.base_intuition);
            this.minRaceIngenuity = parseInt(this.race.base_ingenuity);
            this.minRaceInquisitiveness = parseInt(this.race.base_inquisition);
            this.minRaceIntelligence = parseInt(this.race.base_intelligence);
            this.minRaceInvigoration = parseInt(this.race.base_invigoration);
            this.minRaceInsanityControl = parseInt(this.race.base_insanity_control);
            this.maxBonusPoints = parseInt(this.race.bonus_points_at_creation);
   
            this.checkEnable();
            setTimeout(() => {//so user doesn't see random flipping
                this.spinnerService.hide();
            }, 400);
            
        })
    }

    public toggleRaceDescription() {
        $("#infoRaceModal").modal();
    }

    public toggleDimensionalityDescription() {
        $("#dimensionalityDescriptionModal").modal();
    }

    public increaseStat(whichStat) {
        let bonusPoints = parseInt(this.race.bonus_points_at_creation);
        let intuition = parseInt(this.race.base_intuition);
        let ingenuity = parseInt(this.race.base_ingenuity);
        let inquisitiveness = parseInt(this.race.base_inquisition);
        let intelligence = parseInt(this.race.base_intelligence);
        let invigoration = parseInt(this.race.base_invigoration);
        let insanityControl = parseInt(this.race.base_insanity_control);

        if (whichStat == 'intuitionUp' && bonusPoints > 0) {
            intuition = intuition + 1;
            bonusPoints = bonusPoints - 1;
            this.race.base_intuition = JSON.stringify(intuition);
            this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);

        }

        if (whichStat == 'ingenuityUp' && bonusPoints > 0) {
            ingenuity = ingenuity + 1;
            bonusPoints = bonusPoints - 1;
            this.race.base_ingenuity = JSON.stringify(ingenuity);
            this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
        }

        if (whichStat == 'inquisitivenessUp' && bonusPoints > 0) {
            inquisitiveness = inquisitiveness + 1;
            bonusPoints = bonusPoints - 1;
            this.race.base_inquisition = JSON.stringify(inquisitiveness);
            this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
        }

        if (whichStat == 'intelligenceUp' && bonusPoints > 0) {
            intelligence = intelligence + 1;
            bonusPoints = bonusPoints - 1;
            this.race.base_intelligence = JSON.stringify(intelligence);
            this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
        }

        if (whichStat == 'invigorationUp' && bonusPoints > 0) {
            invigoration = invigoration + 1;
            bonusPoints = bonusPoints - 1;
            this.race.base_invigoration = JSON.stringify(invigoration);
            this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
        }

        if (whichStat == 'insanityControlUp' && bonusPoints > 0) {
            insanityControl = insanityControl + 1;
            bonusPoints = bonusPoints - 1;
            this.race.base_insanity_control = JSON.stringify(insanityControl);
            this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
        }
        this.checkEnable();
    }


    public decreaseStat(whichStat) {
        let bonusPoints = parseInt(this.race.bonus_points_at_creation);
        let intuition = parseInt(this.race.base_intuition);
        let ingenuity = parseInt(this.race.base_ingenuity);
        let inquisitiveness = parseInt(this.race.base_inquisition);
        let intelligence = parseInt(this.race.base_intelligence);
        let invigoration = parseInt(this.race.base_invigoration);
        let insanityControl = parseInt(this.race.base_insanity_control);

        if (whichStat == 'intuitionDown' && bonusPoints < this.maxBonusPoints && intuition > this.minRaceIntuition) {
            intuition = intuition - 1;
            bonusPoints = bonusPoints + 1;
            this.race.base_intuition = JSON.stringify(intuition);
            this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
        }

        if (whichStat == 'ingenuityDown' && bonusPoints < this.maxBonusPoints && ingenuity > this.minRaceIngenuity) {
            ingenuity = ingenuity - 1;
            bonusPoints = bonusPoints + 1;
            this.race.base_ingenuity = JSON.stringify(ingenuity);
            this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
        }

        if (whichStat == 'inquisitivenessDown' && bonusPoints < this.maxBonusPoints && inquisitiveness > this.minRaceInquisitiveness) {
            inquisitiveness = inquisitiveness - 1;
            bonusPoints = bonusPoints + 1;
            this.race.base_inquisition = JSON.stringify(inquisitiveness);
            this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
        }

        if (whichStat == 'intelligenceDown' && bonusPoints < this.maxBonusPoints && intelligence > this.minRaceIntelligence) {
            intelligence = intelligence - 1;
            bonusPoints = bonusPoints + 1;
            this.race.base_intelligence = JSON.stringify(intelligence);
            this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
        }

        if (whichStat == 'invigorationDown' && bonusPoints < this.maxBonusPoints && invigoration > this.minRaceInvigoration) {
            invigoration = invigoration - 1;
            bonusPoints = bonusPoints + 1;
            this.race.base_invigoration = JSON.stringify(invigoration);
            this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
        }

        if (whichStat == 'insanityControlDown' && bonusPoints < this.maxBonusPoints && insanityControl > this.minRaceInsanityControl) {
            insanityControl = insanityControl - 1;
            bonusPoints = bonusPoints + 1;
            this.race.base_insanity_control = JSON.stringify(insanityControl);
            this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);

        }
        this.checkEnable();
    }

    public nextImage() {
        this.whichImage++
        if (this.whichImage > environment.maxImagesPerRace) {
            this.whichImage = 1;
        }

        if (this.whichImage == 1) {
            this.imageURL = environment.baseImagePath + this.race.image_1;
        }
        if (this.whichImage == 2) {
            this.imageURL = environment.baseImagePath + this.race.image_2;
        }
        if (this.whichImage == 3) {
            this.imageURL = environment.baseImagePath + this.race.image_3;
        }
    }


    public previousImage() {
        this.whichImage--
        if (this.whichImage < 1) {
            this.whichImage = 3;
        }

        if (this.whichImage == 1) {
            this.imageURL = environment.baseImagePath + this.race.image_1;
        }
        if (this.whichImage == 2) {
            this.imageURL = environment.baseImagePath + this.race.image_2;
        }
        if (this.whichImage == 3) {
            this.imageURL = environment.baseImagePath + this.race.image_3;
        }

    }

    public confirm() {

        this.loadingMessageService.changeLoadingMessage('Creating Your Existence...');
        this.spinnerService.show();

        //1. Set sage variable
        this.sage.FK_Race = this.race.id;
        this.sage.Ingenuity = this.race.base_ingenuity;
        this.sage.Inquisitiveness = this.race.base_inquisition;
        this.sage.Insanity_Control = this.race.base_insanity_control;
        this.sage.Intelligence = this.race.base_intelligence;
        this.sage.Intuition = this.race.base_intuition;
        this.sage.Invigoration = this.race.base_invigoration;
        this.sage.Chosen_Image = JSON.stringify(this.whichImage);
        console.log('SageData to be sent off: ' + JSON.stringify(this.sage));

        this.subscription = this.sageCreationService.sendFinalSageInfo(this.sage).subscribe(incomingSage => {
                
            this.sage = incomingSage;
            this.sageUserService.setLocalSageStorage(this.sage);
            this.back();
            //console.log('observing Tooltip: ' + JSON.stringify(this.response));

            setTimeout(() => {//so creation page screen doesn't flash back before being redirected...
                this.spinnerService.hide();
            }, 250);
        })


    }

    public checkEnable() {
        console.log('Observing: bonuspointsatcreation' + this.race.bonus_points_at_creation);
        if (parseInt(this.race.bonus_points_at_creation) < 1 && this.race.is_locked != '1') {
            this.isValid = true;
        }
        else {
            this.isValid = false;
        }
    }

    public back() {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]);//has to navigate and THEN trigger the broadcast singleton
    }
}
