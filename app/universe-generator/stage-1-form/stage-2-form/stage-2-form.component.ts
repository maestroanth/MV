import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
//import { Tally } from '../tally';
import { Universe } from '../../../universe';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Rx";
import { CardService } from '../../../card.service';
import { Stage3FormComponent } from "./stage-3-form/stage-3-form.component";

@Component({
  selector: 'app-stage-2-form',
  templateUrl: './stage-2-form.component.html',
  styleUrls: ['./stage-2-form.component.css']
})
export class Stage2FormComponent implements OnInit {

  constructor(private cardService: CardService) { }

  ngOnInit() {

  }

  @Input()
  stage2Form = {
      showForm: false,
      rolledUniverse: new Universe,
      cost: 10,
      faultyUniverse: 0,
      availableEnergy: 5,
      birthURL: "",
      showCostFaulty: true,
  }

  stage3Form = {
      showForm: false,
      rolledUniverse: new Universe,
      cost: this.stage2Form.cost,
      faultyUniverse: 0,
      availableEnergy: 0,
      spinToggle: false,
      birthURL: "",
      showCostFaulty: true,
  }

  blah = "blah";
  maxPointsYouCanAdjust = localStorage.getItem('Level');
  pointsLeftYouCanAdjust = parseInt(this.maxPointsYouCanAdjust);
  submitToggle = false;
  randomIncrease = 3;//turn to zero to get rid of random stats. I like to make this larger as the Sage grows in Level

  originalCost;
  originalfaultyUniverse;
  originalForceStr1;
  originalForceStr2;
  originalForceStr3;
  originalConceptStr1;
  originalConceptStr2;
  originalConceptStr3;

  SoriginalForceStr1;
  SoriginalForceStr2;
  SoriginalForceStr3;
  SoriginalConceptStr1;
  SoriginalConceptStr2;
  SoriginalConceptStr3;

  errorModalMessage = '';

  pointsInPool = 0;

  @ViewChild(Stage3FormComponent) stage3: Stage3FormComponent;//allows parent to see all child component crap; only other way is to use 'services' btw

  submit() {
      this.stage3Form.rolledUniverse = this.stage2Form.rolledUniverse;
      this.stage3Form.cost = this.stage2Form.cost;
      this.stage3Form.faultyUniverse = this.stage2Form.faultyUniverse;
      this.stage3Form.birthURL = this.stage2Form.birthURL;
      this.stage3Form.showForm = true;

      setTimeout(() => {  
          this.stage3.initialize();
          this.stage2Form.showForm = false;
      }, 50);
  
      

      //proceed to stage 3....
  }

  initialize() {
        this.stage3Form.availableEnergy = this.stage2Form.availableEnergy;
        this.stage3Form.faultyUniverse = this.stage2Form.faultyUniverse;
        this.originalCost = this.stage2Form.cost;
        this.originalfaultyUniverse = this.stage2Form.faultyUniverse;
        this.originalForceStr1 = parseInt(this.stage2Form.rolledUniverse.Force_Str_1) + Math.floor(Math.random() * this.randomIncrease) + 1;
        this.originalForceStr2 = parseInt(this.stage2Form.rolledUniverse.Force_Str_2) + Math.floor(Math.random() * this.randomIncrease) + 1;
        this.originalForceStr3 = parseInt(this.stage2Form.rolledUniverse.Force_Str_3) + Math.floor(Math.random() * this.randomIncrease) + 1;
        this.originalConceptStr1 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_1) + Math.floor(Math.random() * this.randomIncrease) + 1;
        this.originalConceptStr2 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_2) + Math.floor(Math.random() * this.randomIncrease) + 1;
        this.originalConceptStr3 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_3) + Math.floor(Math.random() * this.randomIncrease) + 1;

        this.SoriginalForceStr1 = parseInt(this.stage2Form.rolledUniverse.Force_Str_1);
        this.SoriginalForceStr2 = parseInt(this.stage2Form.rolledUniverse.Force_Str_2);
        this.SoriginalForceStr3 = parseInt(this.stage2Form.rolledUniverse.Force_Str_3);
        this.SoriginalConceptStr1 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_1);
        this.SoriginalConceptStr2 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_2);
        this.SoriginalConceptStr3 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_3);
        
        this.reset();
  }

    reroll() {
        if (this.stage2Form.cost + 1 < this.stage2Form.availableEnergy) {
            if (this.originalfaultyUniverse < 89) {
                this.originalCost = this.originalCost + 5;
                this.originalfaultyUniverse = this.originalfaultyUniverse + 10;
                this.originalForceStr1 = this.SoriginalForceStr1 + Math.floor(Math.random() * this.randomIncrease) + 1;
                this.originalForceStr2 = this.SoriginalForceStr2 + Math.floor(Math.random() * this.randomIncrease) + 1;
                this.originalForceStr3 = this.SoriginalForceStr3 + Math.floor(Math.random() * this.randomIncrease) + 1;
                this.originalConceptStr1 = this.SoriginalConceptStr1 + Math.floor(Math.random() * this.randomIncrease) + 1;
                this.originalConceptStr2 = this.SoriginalConceptStr2 + Math.floor(Math.random() * this.randomIncrease) + 1;
                this.originalConceptStr3 = this.SoriginalConceptStr3 + Math.floor(Math.random() * this.randomIncrease) + 1;
                this.reset();
            }
            else {

                this.errorModalMessage = '"Dear Sage, I apologize, but you cannot reroll anymore; otherwise, you will have a 100% or greater chance of a "Faulty Universe"!!!';
                $("#errorModal2").modal();
           }
        }
        else {
            this.errorModalMessage = '"Dear Sage, I apologize, but you do not have the energy to reroll anymore."';
            $("#errorModal2").modal();
         }

    }

    reset() {
      console.log("points left you can adjust reset: " + this.pointsLeftYouCanAdjust);
      this.pointsLeftYouCanAdjust = parseInt(this.maxPointsYouCanAdjust);
      console.log("points left you can adjust reset: " + this.pointsLeftYouCanAdjust);
      this.pointsInPool = 0;
      this.stage2Form.rolledUniverse.Force_Str_1 = this.originalForceStr1;
      this.stage2Form.rolledUniverse.Force_Str_2 = this.originalForceStr2;
      this.stage2Form.rolledUniverse.Force_Str_3 = this.originalForceStr3;
      this.stage2Form.rolledUniverse.Concept_Str_1 = this.originalConceptStr1;
      this.stage2Form.rolledUniverse.Concept_Str_2 = this.originalConceptStr2;
      this.stage2Form.rolledUniverse.Concept_Str_3 = this.originalConceptStr3;
      this.stage2Form.cost = this.originalCost;
      this.stage2Form.faultyUniverse = this.originalfaultyUniverse;
  }

  public increaseStat(whichStat) {
      let Force_Str_1 = parseInt(this.stage2Form.rolledUniverse.Force_Str_1);
      let Force_Str_2 = parseInt(this.stage2Form.rolledUniverse.Force_Str_2);
      let Force_Str_3 = parseInt(this.stage2Form.rolledUniverse.Force_Str_3);
      let Concept_Str_1 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_1);
      let Concept_Str_2 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_2);
      let Concept_Str_3 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_3);

      console.log("originalfaultyUniverse: " + this.originalfaultyUniverse);
      //console.log("stage1Availenergy: " + this.stage1Form.availableEnergy);
      if (this.stage2Form.cost + 5 < this.stage2Form.availableEnergy) {
          if (this.originalfaultyUniverse < 94) {
              if (whichStat == 'Force_Str_1-Up' && this.pointsInPool > 0) {
                  Force_Str_1 = Force_Str_1 + 1;
                  this.stage2Form.rolledUniverse.Force_Str_1 = JSON.stringify(Force_Str_1);
                  this.pointsInPool = this.pointsInPool - 1;
                  this.stage2Form.cost = this.stage2Form.cost + 5;
                  this.stage2Form.faultyUniverse = this.stage2Form.faultyUniverse + 5;

              }

              if (whichStat == 'Force_Str_2-Up' && this.pointsInPool > 0) {
                  Force_Str_2 = Force_Str_2 + 1;
                  this.stage2Form.rolledUniverse.Force_Str_2 = JSON.stringify(Force_Str_2);
                  this.pointsInPool = this.pointsInPool - 1;
                  this.stage2Form.cost = this.stage2Form.cost + 5;
                  this.stage2Form.faultyUniverse = this.stage2Form.faultyUniverse + 5;
              }

              if (whichStat == 'Force_Str_3-Up' && this.pointsInPool > 0) {
                  Force_Str_3 = Force_Str_3 + 1;
                  this.stage2Form.rolledUniverse.Force_Str_3 = JSON.stringify(Force_Str_3);
                  this.pointsInPool = this.pointsInPool - 1;
                  this.stage2Form.cost = this.stage2Form.cost + 5;
                  this.stage2Form.faultyUniverse = this.stage2Form.faultyUniverse + 5;
              }

              if (whichStat == 'Concept_Str_1-Up' && this.pointsInPool > 0) {
                  Concept_Str_1 = Concept_Str_1 + 1;
                  this.stage2Form.rolledUniverse.Concept_Str_1 = JSON.stringify(Concept_Str_1);
                  this.pointsInPool = this.pointsInPool - 1;
                  this.stage2Form.cost = this.stage2Form.cost + 5;
                  this.stage2Form.faultyUniverse = this.stage2Form.faultyUniverse + 5;
              }

              if (whichStat == 'Concept_Str_2-Up' && this.pointsInPool > 0) {
                  Concept_Str_2 = Concept_Str_2 + 1;
                  this.stage2Form.rolledUniverse.Concept_Str_2 = JSON.stringify(Concept_Str_2);
                  this.pointsInPool = this.pointsInPool - 1;
                  this.stage2Form.cost = this.stage2Form.cost + 5;
                  this.stage2Form.faultyUniverse = this.stage2Form.faultyUniverse + 5;
              }

              if (whichStat == 'Concept_Str_3-Up' && this.pointsInPool > 0) {
                  Concept_Str_3 = Concept_Str_3 + 1;
                  this.stage2Form.rolledUniverse.Concept_Str_3 = JSON.stringify(Concept_Str_3);
                  this.pointsInPool = this.pointsInPool - 1;
                  this.stage2Form.cost = this.stage2Form.cost + 5;
                  this.stage2Form.faultyUniverse = this.stage2Form.faultyUniverse + 5;
              }
          }
            //this.checkEnable();
          else {
              this.errorModalMessage = '"Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
              $("#errorModal2").modal();
          }
      }
      else {
          this.errorModalMessage = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
          $("#errorModal2").modal();
      }
  }


  public decreaseStat(whichStat) {
      let Force_Str_1 = parseInt(this.stage2Form.rolledUniverse.Force_Str_1);
      let Force_Str_2 = parseInt(this.stage2Form.rolledUniverse.Force_Str_2);
      let Force_Str_3 = parseInt(this.stage2Form.rolledUniverse.Force_Str_3);
      let Concept_Str_1 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_1);
      let Concept_Str_2 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_2);
      let Concept_Str_3 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_3);

      if (whichStat == 'Force_Str_1-Down' && this.pointsLeftYouCanAdjust > 0 && Force_Str_1 > 0) {
          Force_Str_1 = Force_Str_1 - 1;
          this.pointsLeftYouCanAdjust = this.pointsLeftYouCanAdjust - 1;
          this.stage2Form.rolledUniverse.Force_Str_1 = JSON.stringify(Force_Str_1);
          this.pointsInPool = this.pointsInPool + 1;
      }

      if (whichStat == 'Force_Str_2-Down' && this.pointsLeftYouCanAdjust > 0 && Force_Str_2 > 0) {
          Force_Str_2 = Force_Str_2 - 1;
          this.pointsLeftYouCanAdjust = this.pointsLeftYouCanAdjust - 1;
          this.stage2Form.rolledUniverse.Force_Str_2 = JSON.stringify(Force_Str_2);
          this.pointsInPool = this.pointsInPool + 1;
      }

      if (whichStat == 'Force_Str_3-Down' && this.pointsLeftYouCanAdjust > 0 && Force_Str_3 > 0) {
          Force_Str_3 = Force_Str_3 - 1;
          this.pointsLeftYouCanAdjust = this.pointsLeftYouCanAdjust - 1;
          this.stage2Form.rolledUniverse.Force_Str_3 = JSON.stringify(Force_Str_3);
          this.pointsInPool = this.pointsInPool + 1;
      }

      if (whichStat == 'Concept_Str_1-Down' && this.pointsLeftYouCanAdjust > 0 && Concept_Str_1 > 0) {
          Concept_Str_1 = Concept_Str_1 - 1;
          this.pointsLeftYouCanAdjust = this.pointsLeftYouCanAdjust - 1;
          this.stage2Form.rolledUniverse.Concept_Str_1 = JSON.stringify(Concept_Str_1);
          this.pointsInPool = this.pointsInPool + 1;
      }

      if (whichStat == 'Concept_Str_2-Down' && this.pointsLeftYouCanAdjust > 0 && Concept_Str_2 > 0) {
          Concept_Str_2 = Concept_Str_2 - 1;
          this.pointsLeftYouCanAdjust = this.pointsLeftYouCanAdjust - 1;
          this.stage2Form.rolledUniverse.Concept_Str_2 = JSON.stringify(Concept_Str_2);
          this.pointsInPool = this.pointsInPool + 1;
      }

      if (whichStat == 'Concept_Str_3-Down' && this.pointsLeftYouCanAdjust > 0 && Concept_Str_3 > 0) {
          Concept_Str_3 = Concept_Str_3 - 1;
          this.pointsLeftYouCanAdjust = this.pointsLeftYouCanAdjust - 1;
          this.stage2Form.rolledUniverse.Concept_Str_3 = JSON.stringify(Concept_Str_3);
          this.pointsInPool = this.pointsInPool + 1;

      }
  }

}
