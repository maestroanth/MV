import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm, Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
//import { Tally } from '../tally';
import { Universe } from '../../../../universe';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Rx";
import { CardService } from '../../../../card.service';
import { Stage4FormComponent } from "./stage-4-form/stage-4-form.component";
import { SageUserService } from '../../../../sage-user.service';
import { Move } from '../../../../move';
import { UniverseCard } from '../../../../universe-card';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadingMessageService } from '../../../../loading-message.service';

@Component({
    selector: 'app-stage-3-form',
    templateUrl: './stage-3-form.component.html',
    styleUrls: ['./stage-3-form.component.css']
})
export class Stage3FormComponent implements OnInit {

    constructor(private cardService: CardService, private sageUserService: SageUserService, private spinnerService: Ng4LoadingSpinnerService,
        private loadingMessageService: LoadingMessageService) {

    }

    ngOnInit() {
    }

    @Input()
    stage3Form = {
        showForm: false,
        rolledUniverse: new Universe,
        cost: 5,
        faultyUniverse: 0,
        availableEnergy: 5,
        spinToggle: false,
        showCostFaulty: true,
        birthURL: "",
    }

    stage4Form = {
        showForm: false,
        universeCard: new UniverseCard,
        availableEnergy: 5,
        rollMessage: '',
        showCostFaulty: false,

    }

    renderUniverseForm = {
        showForm: false,
        universeCard: new UniverseCard,
        availableEnergy: 5,
        rollMessage: '',
        showCostFaulty: false,
    }

    finalUniverseCard = new UniverseCard;

    resultsToggle = false;
    errorModalMessage = '';
    buff1EnergyCost = 2;
    buff1FaultyIncrease = 1;
    buff2EnergyCost = 2;
    buff2FaultyIncrease = 1;
    buff3EnergyCost = 2;
    buff3FaultyIncrease = 1;
    buff4EnergyCost = 2;
    buff4FaultyIncrease = 1;
    buff5EnergyCost = 2;
    buff5FaultyIncrease = 1;
    rollUniverse = false;
    purchase2EnergyCost = 1;
    purchase2FaultyIncrease = 1;
    purchase3EnergyCost = 5;
    purchase3FaultyIncrease = 2;
    purchase4EnergyCost = 10;
    purchase4FaultyIncrease = 5;
    purchase5EnergyCost = 0;
    purchase5FaultyIncrease = 10;

    reroll2EnergyCost = 5;
    reroll2FaultyIncrease = 2;
    reroll3EnergyCost = 5;
    reroll3FaultyIncrease = 3;
    reroll4EnergyCost = 5;
    reroll4FaultyIncrease = 4;
    reroll5EnergyCost = 0;
    reroll5FaultyIncrease = 0;

    buff1Tally = 0;
    buff2Tally = 0;
    buff3Tally = 0;
    buff4Tally = 0;
    buff5Tally = 0;

    rollMessage = "";
    rollSucceeded = false;
    boolFailColor = true;

    moves = new Array<Move>();
    response;
    noMoveEligibleMessage = "No eligible move is avilable for this slot.";

    chosenMoves = new Array<Move>();
    Move1Name = '';

    @ViewChild(Stage4FormComponent) stage4: Stage4FormComponent;//allows parent to see all child component crap; only other way is to use 'services' btw


    /*
     
      Ability Design: For now, I'm thinking about limiting the game to 7 global forces and 5 global concepts all around.  Forces can be about dealing
      and resisting damage and concepts can be applied towards ultimate move buildups. (You gain points toward a concept from moves)
  
      Form Design:
      What the user needs to be rendered: 5 slots The Default Move (cannot be modified, but can be buffed), a common move, an uncommon move, a rare move,
      and an ultimate move.
  
      Do a random die roll on each during initialization and show the results:
        A common move slot can cost 1 energy and  1%: can only contain moves within the scope of the forces/concepts
        An uncommonmove slot can cost 5 energy and 2% Faulty Universe chance.
        An rare move slot can cost 10 energy and 5% Faulty Universe chance. This can be from anywhere.
  
        An Ultimate move slot...IDK yet, I'm thinking this will be a rare one time roll per Universe to see if it's eligble for cheap price.
        It can say a cool bonus effect like, "Congratualations you have the chance to create a "Perfect Universe"! If you choose to go for it,
        you will gain a random Ultimate Move for this Universe and it will be marked accordingly, but you also risk blowing it up! (Extra 10% Faulty
        Universe chance)...I'm leaning towards letting the user either choose one of the default ultimate moves, or allowing them to access to any
        ultimate move, but it will be random.
  
      Rerolling all of these is an option at a price (Except the Ultimate Move slot. This one is stuck).
  
      It'll be possible to buff a move at the cost of 2 energy and faulty universe 1% chance . There will be a buff count which will start small and increase
      the more you buff it. (I'm just going to have it cost double as you buff it) The cost is the same no matter rarity.
  
      Make sure the moves where you re-roll are done in the correct order (re-roll can be done first with a purchase, and only after purchase, the buff option becomes available)
  
      Submitting
      At this point there will be a faulty Universe roll.  Higher is always good.  If failed, it will jump to render-universe with a 'sowwy' message,
      and add a faulty Universe tag storing the stat's of what it "could have" been.  Later in design, I'll probably add an option to let user
      try again and making this old Universe.
  
      If success, then pass the card object along to stage 4 so user can name it and edit the description.  
  
      */


    RandMoveName1 = new Array();
    RandMoveName2 = new Array();
    RandMoveName3 = new Array();


    radioMove2Choice1 = "No Eligible Move For This Slot";;
    radioMove2Choice2 = "No Eligible Move For This Slot";;
    radioMove2Choice3 = "No Eligible Move For This Slot";;

    radioMove3Choice1 = "No Eligible Move For This Slot";;
    radioMove3Choice2 = "No Eligible Move For This Slot";;
    radioMove3Choice3 = "No Eligible Move For This Slot";;

    radioMove4Choice1 = "No Eligible Move For This Slot";;
    radioMove4Choice2 = "No Eligible Move For This Slot";;
    radioMove4Choice3 = "No Eligible Move For This Slot";;

    selectedEntry2 = "No Eligible Move For This Slot";
    selectedEntry3 = "No Eligible Move For This Slot";
    selectedEntry4 = "No Eligible Move For This Slot";

    onSelectionChange2(entry) {
        this.selectedEntry2 = entry;
    }

    onSelectionChange3(entry) {
        this.selectedEntry3 = entry;
    }

    onSelectionChange4(entry) {
        this.selectedEntry4 = entry;
    }

    move2Purchase = new Move;
    move3Purchase = new Move;
    move4Purchase = new Move;

    perfectUniverse = false;
    deepCopy = new Array<Move>();


    buff1Toggle = true;
    buff2Toggle = false;
    buff3Toggle = false;
    buff4Toggle = false;
    buff5Toggle = false

    MoveUltimateName = "";

    purchase2Toggle = true;
    purchase3Toggle = true;
    purchase4Toggle = true;
    purchase5Toggle = true;

    reroll2Toggle = true;
    reroll3Toggle = true;
    reroll4Toggle = true;
    reroll5Toggle = true;

    move2Radio = true;
    move3Radio = true;
    move4Radio = true;

    reroll(which) {

        let cost;
        let faulty;

        if (which == 2) {
            faulty = 99;

        }

        if (which == 3) {
            faulty = 98;
        }

        if (which == 4) {
            faulty = 96;
        }

        if (this.stage3Form.cost + 5 < this.stage3Form.availableEnergy) {
            if (this.stage3Form.faultyUniverse < faulty) {

                this.moves = this.deepCopy;//I'm hoping this fills up the referenced array
                this.deepCopy = JSON.parse(JSON.stringify(this.moves));
                this.movesInitialize(which);
                this.stage3Form.cost = this.stage3Form.cost + 5;
                this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + (101 - faulty);
            }
            else {
                if (which == 2) {
                    this.errorModalMessage = '"Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                    $("#errorModal3").modal();
                }
                if (which == 3) {
                    this.errorModalMessage = '"Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                    $("#errorModal3").modal();
                }
                if (which == 4) {
                    this.errorModalMessage = '"Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                    $("#errorModal3").modal();
                }

            }
        }
        else {
            if (which == 2) {
                this.errorModalMessage = '"Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
                $("#errorModal3").modal();
            }
            if (which == 3) {
                this.errorModalMessage = '"Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
                $("#errorModal3").modal();
            }
            if (which == 4) {
                this.errorModalMessage = '"Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
                $("#errorModal3").modal();
            }
        }


    }
    name;

    rerollUltimate() {

        let rand5;
        this.moves = this.deepCopy;//I'm hoping this fills up the referenced array
        this.deepCopy = JSON.parse(JSON.stringify(this.moves));
        let trimmedMoves = this.moves;
        for (let i = 0; i < trimmedMoves.length; i++) {
            if (this.moves[i].ultimate == '0') {//if it's an ultimate it can just go ahead and be trimmed without worrying about all the else garbage
                trimmedMoves.splice(i, 1);//no force and concept fields are in common to be eligible for Move 2
                i--;//counts i back down so it doesn't skip evaulating one
            }
        }

        if (this.moves.length > 0) {
            do {
                rand5 = Math.floor(Math.random() * trimmedMoves.length);
            } while (this.stage3Form.rolledUniverse.FK_Move_Ultimate_Default == trimmedMoves[rand5].id)//so it doesn't match original move

            this.MoveUltimateName = this.moves[rand5].name;
        }
        this.moves = this.deepCopy;
        this.reroll5Toggle = false;
    }

    purchase2() {

        if (this.stage3Form.cost + 1 < this.stage3Form.availableEnergy) {
            if (this.stage3Form.faultyUniverse < 99) {
                if (this.selectedEntry2 != undefined && this.selectedEntry2 != null && this.selectedEntry2 != "No Eligible Move For This Slot") {
                    this.name = this.selectedEntry2;
                    console.log("Move 2 Purchase: " + this.name);
                    this.stage3Form.cost = this.stage3Form.cost + 1;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + 1;
                    this.purchase2Toggle = false;
                    this.reroll2Toggle = false;
                    this.buff2Toggle = true;
                    this.move2Radio = false;
                    //this.stage3Form.availableEnergy = this.stage3Form.availableEnergy - 1;
                }
                else {
                    this.errorModalMessage = '"Dear Sage, you must realize that it is pointless to purchase a move that is out of existence!"';
                    $("#errorModal3").modal();
                }
            }
            else {
                this.errorModalMessage = '"Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                $("#errorModal3").modal();
            }
        }
        else {
            this.errorModalMessage = '"Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
            $("#errorModal3").modal();
        }

    }

    purchase3() {

        if (this.stage3Form.cost + 5 < this.stage3Form.availableEnergy) {
            if (this.stage3Form.faultyUniverse < 98) {
                if (this.selectedEntry3 != undefined && this.selectedEntry3 != null && this.selectedEntry3 != "No Eligible Move For This Slot") {
                    this.name = this.selectedEntry3;
                    console.log("Move 3 Purchase: " + this.name);
                    this.stage3Form.cost = this.stage3Form.cost + 5;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + 2;
                    this.purchase3Toggle = false;
                    this.reroll3Toggle = false;
                    this.buff3Toggle = true;
                    this.move3Radio = false;
                    //this.stage3Form.availableEnergy = this.stage3Form.availableEnergy - 5;
                }
                else {
                    this.errorModalMessage = '"Dear Sage, you must realize that it is pointless to purchase a move that is out of existence!"';
                    $("#errorModal3").modal();
                }
            }
            else {
                this.errorModalMessage = '"Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                $("#errorModal3").modal();
            }
        }
        else {
            this.errorModalMessage = '"Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
            $("#errorModal3").modal();
        }


    }

    purchase4() {
        if (this.stage3Form.cost + 10 < this.stage3Form.availableEnergy) {
            if (this.stage3Form.faultyUniverse < 95) {
                if (this.selectedEntry4 != undefined && this.selectedEntry4 != null && this.selectedEntry4 != "No Eligible Move For This Slot") {
                    this.name = this.selectedEntry4;
                    console.log("Move 4 Purchase: " + this.name);
                    this.stage3Form.cost = this.stage3Form.cost + 10;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + 5;
                    this.purchase4Toggle = false;
                    this.reroll4Toggle = false;
                    this.buff4Toggle = true;
                    this.move4Radio = false;
                    //this.stage3Form.availableEnergy = this.stage3Form.availableEnergy - 10;
                }
                else {
                    this.errorModalMessage = '"Dear Sage, you must realize that it is pointless to purchase a move that is out of existence!"';
                    $("#errorModal3").modal();
                }
            }
            else {
                this.errorModalMessage = '"Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                $("#errorModal3").modal();
            }
        }
        else {
            this.errorModalMessage = '"Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
            $("#errorModal3").modal();
        }
    }

    purchase5() {
        if (this.stage3Form.faultyUniverse < 90) {
            this.name = this.MoveUltimateName;
            console.log("Move 5 Purchase: " + this.name);
            this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + 10;
            this.purchase5Toggle = false;
            this.reroll5Toggle = false;
            this.buff5Toggle = true;
        }
        else {
            this.errorModalMessage = '"Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
            $("#errorModal3").modal();
        }
    }

    buff(which) {
        if (which == 1) {
            if (this.stage3Form.cost + this.buff1EnergyCost < this.stage3Form.availableEnergy) {
                if (this.stage3Form.faultyUniverse < (100 - this.buff1FaultyIncrease)) {
                    this.buff1Tally = this.buff1Tally + 1;
                    this.stage3Form.cost = this.stage3Form.cost + this.buff1EnergyCost;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + this.buff1FaultyIncrease;
                    this.buff1EnergyCost = this.buff1EnergyCost * 2;
                    this.buff1FaultyIncrease = this.buff1FaultyIncrease * 2;
                }
                else {
                    this.errorModalMessage = '"Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                    $("#errorModal3").modal();
                }
            }
            else {
                this.errorModalMessage = '"Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
                $("#errorModal3").modal();

            }
        }

        if (which == 2) {
            if (this.stage3Form.cost + this.buff2EnergyCost < this.stage3Form.availableEnergy) {
                if (this.stage3Form.faultyUniverse < (100 - this.buff2FaultyIncrease)) {
                    this.buff2Tally = this.buff2Tally + 1;
                    this.stage3Form.cost = this.stage3Form.cost + this.buff2EnergyCost;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + this.buff2FaultyIncrease;
                    this.buff2EnergyCost = this.buff2EnergyCost * 2;
                    this.buff2FaultyIncrease = this.buff2FaultyIncrease * 2;
                }
                else {
                    this.errorModalMessage = '"Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                    $("#errorModal3").modal();
                }
            }
            else {
                this.errorModalMessage = '"Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
                $("#errorModal3").modal();

            }
        }

        if (which == 3) {
            if (this.stage3Form.cost + this.buff3EnergyCost < this.stage3Form.availableEnergy) {
                if (this.stage3Form.faultyUniverse < (100 - this.buff3FaultyIncrease)) {
                    this.buff3Tally = this.buff3Tally + 1;
                    this.stage3Form.cost = this.stage3Form.cost + this.buff3EnergyCost;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + this.buff3FaultyIncrease;
                    this.buff3EnergyCost = this.buff3EnergyCost * 2;
                    this.buff3FaultyIncrease = this.buff3FaultyIncrease * 2;
                }
                else {
                    this.errorModalMessage = '"Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                    $("#errorModal3").modal();
                }
            }
            else {
                this.errorModalMessage = '"Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
                $("#errorModal3").modal();
            }
        }

        if (which == 4) {
            if (this.stage3Form.cost + this.buff4EnergyCost < this.stage3Form.availableEnergy) {
                if (this.stage3Form.faultyUniverse < (100 - this.buff4FaultyIncrease)) {
                    this.buff4Tally = this.buff4Tally + 1;
                    this.stage3Form.cost = this.stage3Form.cost + this.buff4EnergyCost;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + this.buff4FaultyIncrease;
                    this.buff4EnergyCost = this.buff4EnergyCost * 2;
                    this.buff4FaultyIncrease = this.buff4FaultyIncrease * 2;
                }
                else {
                    this.errorModalMessage = '"Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                    $("#errorModal3").modal();
                }
            }
            else {
                this.errorModalMessage = '"Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
                $("#errorModal3").modal();

            }
        }

        if (which == 5) {
            if (this.stage3Form.cost + this.buff5EnergyCost < this.stage3Form.availableEnergy) {
                if (this.stage3Form.faultyUniverse < (100 - this.buff5FaultyIncrease)) {
                    this.buff5Tally = this.buff5Tally + 1;
                    this.stage3Form.cost = this.stage3Form.cost + this.buff5EnergyCost;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + this.buff5FaultyIncrease;
                    this.buff5EnergyCost = this.buff5EnergyCost * 2;
                    this.buff5FaultyIncrease = this.buff5FaultyIncrease * 2;
                }
                else {
                    this.errorModalMessage = '"Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                    $("#errorModal3").modal();
                }
            }
            else {
                this.errorModalMessage = '"Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
                $("#errorModal3").modal();

            }
        }




    }


  rollUniverseCard() {
      let randFaulty = Math.floor(Math.random() * 100) + 1;
      let needToRoll = this.stage3Form.faultyUniverse;

      if (randFaulty >= needToRoll) {
          this.rollMessage = "Success! You rolled a " + randFaulty + "%, and needed a " + needToRoll + "%!";
          this.boolFailColor = false;
      }
      else {
          this.rollMessage = "A Faulty Universe! My apologies Ma' Lord, :( You rolled a " + randFaulty + "%, and needed a " + needToRoll + "%!";
      }

      

      console.log("You rolled a " + randFaulty + "%!");
      this.loadingMessageService.changeLoadingMessage('Creating A New Universe...');
      this.spinnerService.show();
      
      //set stage4 model universe
      this.finalUniverseCard.FK_base_universe = this.stage3Form.rolledUniverse.id;
      if (randFaulty >= this.stage3Form.faultyUniverse) {
          this.finalUniverseCard.name = this.stage3Form.rolledUniverse.name;
          this.finalUniverseCard.description = this.stage3Form.rolledUniverse.description;
          this.finalUniverseCard.FK_base_universe = this.stage3Form.rolledUniverse.id;
      }
      else {
          this.finalUniverseCard.name = "A Faulty " + this.stage3Form.rolledUniverse.name;
          this.finalUniverseCard.description = "A failed Universe. There maybe some way to recover this Universe, but for now it is useless.....";
          this.finalUniverseCard.FK_base_universe = this.stage3Form.rolledUniverse.id;
      }

      this.finalUniverseCard.Force_Name_1 = this.stage3Form.rolledUniverse.Force_1;
      this.finalUniverseCard.Force_Name_2 = this.stage3Form.rolledUniverse.Force_2;
      this.finalUniverseCard.Force_Name_3 = this.stage3Form.rolledUniverse.Force_3;
      this.finalUniverseCard.Strength_Force_1 = this.stage3Form.rolledUniverse.Force_Str_1;
      this.finalUniverseCard.Strength_Force_2 = this.stage3Form.rolledUniverse.Force_Str_2;
      this.finalUniverseCard.Strength_Force_3 = this.stage3Form.rolledUniverse.Force_Str_3;

      this.finalUniverseCard.Concept_Name_1 = this.stage3Form.rolledUniverse.Concept_1;
      this.finalUniverseCard.Concept_Name_2 = this.stage3Form.rolledUniverse.Concept_2;
      this.finalUniverseCard.Concept_Name_3 = this.stage3Form.rolledUniverse.Concept_3;

      this.finalUniverseCard.Strength_Concept_1 = this.stage3Form.rolledUniverse.Concept_Str_1;
      this.finalUniverseCard.Strength_Concept_2 = this.stage3Form.rolledUniverse.Concept_Str_2;
      this.finalUniverseCard.Strength_Concept_3 = this.stage3Form.rolledUniverse.Concept_Str_3;

      this.finalUniverseCard.FK_Move_1 = this.stage3Form.rolledUniverse.FK_Move_1_Default;

      this.finalUniverseCard.Energy_Value = this.stage3Form.cost.toString();

      //need to get FK's from names
      for (let i = 0; i < this.deepCopy.length; i++) {
          if (this.selectedEntry2 == this.deepCopy[i].name) {
              console.log("Move 2 Added into final model: " + this.selectedEntry2);
              this.finalUniverseCard.FK_Move_2 = this.deepCopy[i].id;
          }
          if (this.selectedEntry3 == this.deepCopy[i].name) {
              console.log("Move 3 Added into final model: " + this.selectedEntry2);
              this.finalUniverseCard.FK_Move_3 = this.deepCopy[i].id;
          }
          if (this.selectedEntry4 == this.deepCopy[i].name) {
              console.log("Move 4 Added into final model: " + this.selectedEntry2);
              this.finalUniverseCard.FK_Move_4 = this.deepCopy[i].id;
          }
          if (this.MoveUltimateName == this.deepCopy[i].name) {
              console.log("Move Ultimate Added into final model: " + this.selectedEntry2);
              this.finalUniverseCard.FK_Move_Ultimate = this.deepCopy[i].id;
          }
      }

      this.finalUniverseCard.Move1_Buff_Tally = this.buff1Tally.toString();
      this.finalUniverseCard.Move2_Buff_Tally = this.buff2Tally.toString();
      this.finalUniverseCard.Move3_Buff_Tally = this.buff3Tally.toString();
      this.finalUniverseCard.Move4_Buff_Tally = this.buff4Tally.toString();
      this.finalUniverseCard.MoveUltimate_Buff_Tally = this.buff5Tally.toString();
      this.finalUniverseCard.Birth_URL = "https://" + this.stage3Form.birthURL;
      this.finalUniverseCard.Created_By = localStorage.getItem('sagename');
      console.log("Created By sage: " + this.finalUniverseCard.Created_By);


      let stopCondition = false;
      Observable.interval(3000)
          .takeWhile(() => !stopCondition)
          .subscribe(i => {
              //upload card to API
              this.cardService.postNewCard(this.finalUniverseCard, localStorage.getItem('sage_id')).subscribe(response => {

                      this.spinnerService.hide();
                      if (this.resultsToggle == false) {
                          this.resultsToggle = true;
                      }

                      if (randFaulty >= needToRoll) {
                          this.stage4Form.availableEnergy = this.stage3Form.availableEnergy;
                          this.stage4Form.rollMessage = this.rollMessage;
                          this.stage4Form.universeCard = response;
                          this.stage4Form.showCostFaulty = false;
                          this.rollSucceeded = true;
                      }
                      else {
                          this.renderUniverseForm.availableEnergy = this.stage3Form.availableEnergy;
                          this.renderUniverseForm.rollMessage = this.rollMessage;
                          this.renderUniverseForm.universeCard = response;
                          this.renderUniverseForm.showCostFaulty = false;

                      }


                      console.log("Buff1Tally: " + this.finalUniverseCard.Move1_Buff_Tally);
                      console.log("New Card added to DB: " + " Name: " + this.finalUniverseCard.name + " Birth URL: " + this.finalUniverseCard.Birth_URL);
                      this.spinnerService.hide();
                  }


            );
              stopCondition = true;
          })
  }
      

     

  
 

  getMove1() {
    //console.log("Default Move FK In Stored Universe: " + this.stage3Form.rolledUniverse.FK_Move_1_Default);
    for (let i = 0; i < this.moves.length; i++) {
      if (this.moves[i]['id'] == this.stage3Form.rolledUniverse.FK_Move_1_Default) {

          this.chosenMoves[0] = this.moves[i];
          this.Move1Name = this.chosenMoves[0].name;
          //console.log("Default Move: " + this.chosenMoves[0].name);
          this.moves.splice(i, 1);//removes '1' item at i'th index...this is important so it doesn't turn up as an option for later
      }
    }
  }

  initialize() {
      ///this.stage4Form.availableEnergy = this.stage3Form.availableEnergy;
      ///this.stage4Form.faultyUniverse = this.stage3Form.faultyUniverse;
      ///this.stage4Form.cost = this.stage3Form.cost;
      $("#openingModal3").modal();
      this.cardService.getMovesTable().subscribe(incomingMoves => {
          this.moves = incomingMoves;
          
          //console.log(JSON.parse(incomingMoves));
            //Move 1 Move FK is already in universe just search the moves array for that
          //console.log("FK DEFAULT MOVE: " + this.stage3Form.rolledUniverse.FK_Move_1_Default);
          this.getMove1();
          this.deepCopy = JSON.parse(JSON.stringify(this.moves));

          //initializes in reverse order since the trim restrictions increase (and one is a subset of another
          //and I cannot get deep array cloning to work for each case without circular referencing being cause

          //let perfectRoll = Math.floor(Math.random() * 30) + 1;
          let perfectRoll = 30;
          console.log("Perfect Roll: " + perfectRoll);
          if (perfectRoll == 30) {
              this.initializeUltimate();
              $("#perfectUniverseModal").modal();
          }
          this.movesInitialize(4);

          this.movesInitialize(3);
          this.movesInitialize(2);

        
          console.log("Moves object size: " + this.moves.length);
          console.log("Universe Force 1: " + this.stage3Form.rolledUniverse['Force_1']);
          console.log("Universe Force 2: " + this.stage3Form.rolledUniverse['Force_2']);
          console.log("Universe Force 3: " + this.stage3Form.rolledUniverse['Force_3']);
          console.log("Universe Concept 1: " + this.stage3Form.rolledUniverse['Concept_1']);
          console.log("Universe Concept 2: " + this.stage3Form.rolledUniverse['Concept_2']);
          console.log("Universe Concept 3: " + this.stage3Form.rolledUniverse['Concept_3']);

          this.rollUniverse = true;
          this.stage3Form.spinToggle = false;
      });


      this.sageUserService.getError().subscribe(incomingError => {
          this.errorModalMessage = "Couldn't Load Move Data." + incomingError + "Please make sure you are logged in.";
          $("#errorModal3").modal();

      });//remember this does ALL error handling for this form
      //need to pull in the whole table of moves

     


      //perfectUniverse roll
      console.log("Universe Data So Far (Stage 3): " + this.stage3Form.rolledUniverse.name);
      console.log("Universe Data So Far (Stage 3) Force 1: " + this.stage3Form.rolledUniverse.Force_1 + " Strength: " + this.stage3Form.rolledUniverse.Force_Str_1);
  }

  initializeUltimate() {
      this.perfectUniverse = true;
      for (let i = 0; i < this.moves.length; i++) {
          if (this.stage3Form.rolledUniverse.FK_Move_Ultimate_Default == this.moves[i].id) {
              this.MoveUltimateName = this.moves[i].name;
          }
      }
  }

  movesInitialize(whichMove) {
      //trim array to a temp array contain only moves that share a matching force and concept to the Universe
      //let trimmedMoves = new Array();
 
      let trimmedMoves = this.moves;
   
      console.log("Info For Move: " + whichMove);
      console.log("Trimmed Moves size: " + this.moves.length);
      console.log("Moves size: " + this.moves.length);
      //needs to pass 4 tests before it is trimmed None of ForceCat1&2 match None of ConceptCat1&2 match, then trim it from eligible array
      for (let i = 0; i < this.moves.length; i++) {
          //console.log("move being checked #" + i + ": " + this.moves[i].name);
          //forces compare
          let forceComparisonTrim = true;

          //concepts compare
          let conceptComparisonTrim = true;
          console.log("whichMove = " + whichMove);

          if (this.moves[i].ultimate == '1') {//if it's an ultimate it can just go ahead and be trimmed without worrying about all the else garbage
              trimmedMoves.splice(i, 1);//no force and concept fields are in common to be eligible for Move 2
              i--;//counts i back down so it doesn't skip evaulating one
          }
          else {
              forceComparisonTrim = this.moveLogicForceComparison(trimmedMoves, forceComparisonTrim, i);//checks to see if any forces match the universe's forces
              conceptComparisonTrim = this.moveLogicForceComparison(trimmedMoves, conceptComparisonTrim, i);//checks to see if any concepts match the universe's concepts

              //here's where the rule is enforced

              //for common moves
              if (whichMove == 2) {//since both need to equal false to keep, either one equalling true is enough to trim this move from eligibility list
                  if (forceComparisonTrim == true || conceptComparisonTrim == true) {//less restrictive to TRIM
                      trimmedMoves.splice(i, 1);//no force and concept fields are in common to be eligible for Move 2
                      i--;//counts i back down so it doesn't skip evaulating one
                  }
              }

              //for uncommon moves
              if (whichMove == 3) {//since only one needs to equal false to keep, both equalling true is required to trim this move from eligibility list
                  if (forceComparisonTrim == true && conceptComparisonTrim == true) {//more restrictive to TRIM
                      trimmedMoves.splice(i, 1);//no force and concept fields are in common to be eligible for Move 2
                      i--;//counts i back down so it doesn't skip evaulating one
                  }
              }

              //for rare moves
              if (whichMove == 4) {
                  //no trim
              }
          }

              
          
      }
      console.log("Showing Trimmed Array");
      if (trimmedMoves[0] == null || trimmedMoves[0] == undefined) {
          this.RandMoveName1[whichMove] = this.noMoveEligibleMessage;
          this.RandMoveName2[whichMove] = this.noMoveEligibleMessage;
          this.RandMoveName3[whichMove] = this.noMoveEligibleMessage;
      }
      else if (trimmedMoves.length < 1) {
          this.RandMoveName1[whichMove] = trimmedMoves[0].name;
          this.RandMoveName2[whichMove] = this.noMoveEligibleMessage;
          this.RandMoveName3[whichMove] = this.noMoveEligibleMessage;
      }
      else if (trimmedMoves.length < 2) {
          this.RandMoveName1[whichMove] = trimmedMoves[0].name;
          this.RandMoveName2[whichMove] = trimmedMoves[1].name;
          this.RandMoveName3[whichMove] = this.noMoveEligibleMessage;
      }
      else if (trimmedMoves.length < 3) {
          this.RandMoveName1[whichMove] = trimmedMoves[0].name;
          this.RandMoveName2[whichMove] = trimmedMoves[1].name;
          this.RandMoveName3[whichMove] = trimmedMoves[2].name;
      }
      else {

          for (let j = 0; j < trimmedMoves.length; j++) {

              console.log("Move " + j + " Name: " + trimmedMoves[j].name);
          }

          //Roll 3 Random Index ID's
          let rand1 = Math.floor(Math.random() * trimmedMoves.length);
          let rand2;
          let rand3;
          do {

              rand2 = Math.floor(Math.random() * trimmedMoves.length);
          } while (rand2 == rand1)//no duplicates

          do {

              rand3 = Math.floor(Math.random() * trimmedMoves.length);
          } while (rand3 == rand1 || rand3 == rand2)//no duplicates




          //Show the Names (Finally)
          this.RandMoveName1[whichMove] = trimmedMoves[rand1].name;
          this.RandMoveName2[whichMove] = trimmedMoves[rand2].name;
          this.RandMoveName3[whichMove] = trimmedMoves[rand3].name;

          //update radio button bindings
          if (whichMove == 2) {
              this.radioMove2Choice1 = this.RandMoveName1[whichMove];
              this.radioMove2Choice2 = this.RandMoveName2[whichMove];
              this.radioMove2Choice3 = this.RandMoveName3[whichMove];
              this.onSelectionChange2(this.radioMove2Choice1);//initialize check
          }

          if (whichMove == 3) {
              this.radioMove3Choice1 = this.RandMoveName1[whichMove];
              this.radioMove3Choice2 = this.RandMoveName2[whichMove];
              this.radioMove3Choice3 = this.RandMoveName3[whichMove];
              this.onSelectionChange3(this.radioMove3Choice1);//initialize check
          }

          if (whichMove == 4) {
              this.radioMove4Choice1 = this.RandMoveName1[whichMove];
              this.radioMove4Choice2 = this.RandMoveName2[whichMove];
              this.radioMove4Choice3 = this.RandMoveName3[whichMove];
              this.onSelectionChange4(this.radioMove4Choice1);//initialize check
          }
          //Show the Tooltip Stats
      }
  }

  moveLogicForceComparison(trimmedMoves, forceComparisonTrim, i) {
      for (let j = 0; j < 3; j++) {
          let jj = j + 1;
          let index = 'Force_' + jj;
          //console.log("Concatenated index + 1: " + index);
          //console.log("Does " + trimmedMoves[i]['Force_Category_1'] + " Match " + this.stage3Form.rolledUniverse[index] + "?");
          if (trimmedMoves[i]['Force_Category_1'] == this.stage3Form.rolledUniverse[index]) {
              //console.log("Booled to False for Force 1 based on: " + trimmedMoves[i]['Force_Category_1'] + " Matching " + this.stage3Form.rolledUniverse[index]);
              forceComparisonTrim = false;//if one of these matches then it shouldn't be trimmed due to a force matching
          }
      }

      for (let l = 0; l < 3; l++) {
          let ll = l + 1;
          let index = 'Force_' + ll;
          if (trimmedMoves[i]['Force_Category_2'] == this.stage3Form.rolledUniverse[index]) {
              //console.log("Booled to False for Force 2 based on: " + trimmedMoves[i]['Force_Category_2'] + " Matching " + this.stage3Form.rolledUniverse[index]);
              forceComparisonTrim = false;//if one of these matches then it shouldn't be trimmed due to a force matching
          }
      }

      return forceComparisonTrim;
  }

  moveLogicConceptComparison(trimmedMoves, conceptComparisonTrim, i) {
      for (let n = 0; n < 3; n++) {
          let nn = n + 1;
          let index = 'Concept_' + nn;
          if (trimmedMoves[i]['Concept_Category_1'] == this.stage3Form.rolledUniverse[index]) {
              //console.log("Booled to False for Concept 1 based on: " + trimmedMoves[i]['Concept_Category_1'] + " Matching " + this.stage3Form.rolledUniverse[index]);
              conceptComparisonTrim = false;//if one of these matches then it shouldn't be trimmed due to a concept matching
          }
      }

      for (let p = 0; p < 3; p++) {
          let pp = p + 1;
          let index = 'Concept_' + pp;
          if (trimmedMoves[i]['Concept_Category_2'] == this.stage3Form.rolledUniverse[index]) {
              //console.log("Booled to False for Concept 2 based on: " + trimmedMoves[i]['Concept_Category_2'] + " Matching " + this.stage3Form.rolledUniverse[index]);
              conceptComparisonTrim = false;//if one of these matches then it shouldn't be trimmed due to a concept matching
          }
      }
      return conceptComparisonTrim;
  }

  triggerConfirmationModel() {
      $("#confirmModal").modal();
      $("#confirmModal").on("hidden.bs.modal", function () {
          $('#stage3Submit').click();
      });
  }

  cueNextForm() {

      if (this.rollSucceeded == true) {
          this.stage4Form.showForm = true;
          setTimeout(() => {
              this.stage4.initialize();
              this.stage3Form.showForm = false;
          }, 50);
      }
      else {

          this.renderUniverseForm.showForm = true;
      }
      this.stage3Form.showForm = false;
  }
}
