import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
//import { Tally } from '../tally';
import { Universe } from '../../../../../universe';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Rx";
import { CardService } from '../../../../../card.service';
import { RenderUniverseComponent } from "./render-universe/render-universe.component";
import { SageUserService } from '../../../../../sage-user.service';
import { Move } from '../../../../../move';
import { UniverseCard } from '../../../../../universe-card';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadingMessageService } from '../../../../../loading-message.service';

@Component({
    selector: 'app-stage-4-form',
    templateUrl: './stage-4-form.component.html',
    styleUrls: ['./stage-4-form.component.css']
})
export class Stage4FormComponent implements OnInit {

    constructor(private cardService: CardService, private spinnerService: Ng4LoadingSpinnerService,
        private loadingMessageService: LoadingMessageService) { }

    ngOnInit() {
    }

    @Input()
    stage4Form = {
        showForm: false,
        universeCard: new UniverseCard,
        availableEnergy: 5,
        rollMessage: '',
        showCostFaulty: false,
    }

    renderUniverseForm = {
        showForm: false,
        availableEnergy: 5,
        universeCard: new UniverseCard,
        rollMessage: '',
        showCostFaulty: false,
    }

    universeName = '';
    universeDescription = '';

    @ViewChild(RenderUniverseComponent) renderUniverse: RenderUniverseComponent;//allows parent to see all child component crap; only other way is to use 'services' btw

    submit() {
       
        this.renderUniverseForm.universeCard.name = this.universeName;
        this.renderUniverseForm.universeCard.description = this.universeDescription;
        this.loadingMessageService.changeLoadingMessage('Adding Final Touches...');
        this.spinnerService.show();

        this.cardService.updateUniverseCardNameDescription(this.renderUniverseForm.universeCard, this.stage4Form.universeCard.id).subscribe(response => {
            this.renderUniverseForm.universeCard = response;
            console.log("Card Updated: " + this.renderUniverseForm.universeCard);
            this.renderUniverseForm.showForm = true;
            this.renderUniverse.initialize();
            this.stage4Form.showForm = false;

            //proceed to finish....
        });
    }

    initialize() {

        this.renderUniverseForm.universeCard = this.stage4Form.universeCard;
        this.renderUniverseForm.availableEnergy = this.stage4Form.availableEnergy;


        this.universeName = this.stage4Form.universeCard.name;
        this.universeDescription = this.stage4Form.universeCard.description;
        $("#openingModal4").modal();
        console.log("Universe Data So Far: " + this.stage4Form.universeCard);
    }
}
