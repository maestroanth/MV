import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
//import { Tally } from '../tally';
import { Universe } from '../../../../../../universe';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Rx";
import { CardService } from '../../../../../../card.service';
import { UniverseCard } from '../../../../../../universe-card';
import { Move } from '../../../../../../move';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadingMessageService } from '../../../../../../loading-message.service';

@Component({
    selector: 'app-render-universe',
    templateUrl: './render-universe.component.html',
    styleUrls: ['./render-universe.component.css']
})
export class RenderUniverseComponent implements OnInit {

    constructor(private cardService: CardService, private spinnerService: Ng4LoadingSpinnerService,
        private loadingMessageService: LoadingMessageService) { }

    ngOnInit() {
    }

    @Input()
    renderUniverseForm = {
        showForm: false,
        universeCard: new UniverseCard,
        availableEnergy: 5,
        rolledMessage: "",
        showCostFaulty: false,
    }
    fourthForce = false;
    fourthConcept = false;
    scoldMessage = '';
    moves = new Array<Move>();
    moveName = new Array();
    universeCategory = new Universe;
    move2 = true;
    move3 = true;
    move4 = true;
    moveUltimate = true;
    noMoveEligibleMessage = "No eligible move is avilable for this slot.";

    initialize() {
        this.cardService.getMovesTable().subscribe(incomingMoves => {
            this.spinnerService.hide();
            $("#openingModal5").modal();
            this.moveName[0] = 'null';
            this.moves = incomingMoves;
            this.renderUniverseForm.universeCard.Force_Name_4 = "no 4th forces or concepts yet";
            this.renderUniverseForm.universeCard.Concept_Name_4 = "no 4th forces or concepts yet";
            this.renderUniverseForm.universeCard.Strength_Force_4 = "no 4th forces or concepts yet";
            this.renderUniverseForm.universeCard.Strength_Concept_4 = "no 4th forces or concepts yet";

            for (let i = 0; i < this.moves.length; i++) {
                if (this.renderUniverseForm.universeCard.FK_Move_1 == this.moves[i].id) {
                    this.moveName[1] = this.moves[i].name;
                }
                if (this.renderUniverseForm.universeCard.FK_Move_2 == this.moves[i].id) {
                    this.moveName[2] = this.moves[i].name;
                }
                if (this.renderUniverseForm.universeCard.FK_Move_3 == this.moves[i].id) {
                    this.moveName[3] = this.moves[i].name;
                }
                if (this.renderUniverseForm.universeCard.FK_Move_4 == this.moves[i].id) {
                    this.moveName[4] = this.moves[i].name;
                }
                if (this.renderUniverseForm.universeCard.FK_Move_Ultimate == this.moves[i].id) {
                    this.moveName[5] = this.moves[i].name;
                }
            }

            if (this.moveName[1] == null || this.moveName[2] == undefined) {
                this.moveName[1] = this.noMoveEligibleMessage;
                this.renderUniverseForm.universeCard.Move1_Buff_Tally = "N/a";
            }
            if (this.moveName[2] == null || this.moveName[2] == undefined) {
                this.moveName[2] = this.noMoveEligibleMessage;
                this.renderUniverseForm.universeCard.Move2_Buff_Tally = "N/a";
            }
            if (this.moveName[3] == null || this.moveName[3] == undefined) {
                this.moveName[3] = this.noMoveEligibleMessage;
                this.renderUniverseForm.universeCard.Move3_Buff_Tally = "N/a";
            }
            if (this.moveName[4] == null || this.moveName[4] == undefined) {
                this.moveName[4] = this.noMoveEligibleMessage;
                this.renderUniverseForm.universeCard.Move4_Buff_Tally = "N/a";
            }
            if (this.moveName[5] == null || this.moveName[5] == undefined) {
                this.moveName[5] = this.noMoveEligibleMessage;
                this.renderUniverseForm.universeCard.MoveUltimate_Buff_Tally = "N/a";
            }
            


            this.cardService.getUniverseInfo(this.renderUniverseForm.universeCard.FK_base_universe).subscribe(incomingUniverse => {
                console.log("INC UNIVESE CATEGORY: " + JSON.stringify(incomingUniverse));
                this.universeCategory = incomingUniverse;
                console.log("INC UNIVESE CATEGORY2: " + JSON.stringify(this.universeCategory));
                
            });
            //console.log("Universe Data So Far: " + JSON.stringify(this.renderUniverseForm.universeCard));
        });
       
    }
    
}
