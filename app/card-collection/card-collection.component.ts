import { Component, Injectable, OnInit, ViewChild, Input, Output, EventEmitter, NgModule, Optional} from '@angular/core';
import { JsonPipe } from '@angular/common';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../environments/environment';

import { SageUserService } from '../sage-user.service';
import { CardService } from '../card.service';

import { Race } from '../race';
import { Sage } from '../sage';
import { StatusService } from "../status.service";
import { HttpModule, Headers, Http, Response } from '@angular/http';

import { Universe } from '../universe';
import { UniverseCard } from '../universe-card';
import { Force } from '../force';
import { Concept } from '../concept';
import { Move } from '../move';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadingMessageService } from '../loading-message.service';

//import { DataTableModule } from 'angular-4-data-table/src/index';
//import { DataTableParams } from '../../types/data-table-params.type';
//import { DataTable, DataTableTranslations, DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css'],
  
})
   


export class CardCollectionComponent implements OnInit {

    constructor(private router: Router, private sageUserService: SageUserService, private cardService: CardService, private status: StatusService,
        private spinnerService: Ng4LoadingSpinnerService, private loadingMessageService: LoadingMessageService, @Optional() private cards: UniverseCard[],
        @Optional() private moves: Move[], private card: UniverseCard) {
        this.cards = null;
        this.moves = null;
        
    }

    ability1Bonus = "";
    subscription = new Subscription;
    subscription2 = new Subscription;
    subscription3 = new Subscription;
    error;
    response;
    cardList;
    i = 0;
    loadModalToggle = false;/*the variables loadModalToggle and noUniverseToggle sole purpose is to prevent data binding errors with *ngIf's so parts of the DOM don't render until the data is finished being acquired from the API*/
    noUniverseToggle = true;
    title = 'Manage Your Multiverse';
    sub = null;
    imagePath = environment.baseImagePath + 'universe-cards/';
    universeCategory = new Array<Universe>();
    ifScrollBar = false;
    ngOnInit() {
  
        this.loadingMessageService.changeLoadingMessage('Loading your Multiverse...');
        this.spinnerService.show();
  
        this.status.changeStatus("Your Entire Universe Collection");
        this.subscription = this.cardService.getCardCollection(localStorage.getItem('sage_id')).subscribe(incomingCards => {
            //1. Grab the moves table

            this.cardService.getMovesTable().subscribe(incomingMoves => {
                
                this.cards = incomingCards;
                this.moves = incomingMoves;

                if (this.cards.length < 1) {
                    this.noUniverseToggle = true;
                    this.loadModalToggle = false;
                }
                else {
                    

                    //setting Universe Names
                    for (let i = 0; i < this.cards.length; i++) {
                        //3. Get Universe Categories and set them to the same index of Universe Cards
                        this.cardService.getUniverseInfo(this.cards[i].FK_base_universe).subscribe(incomingUniverse => {
                            this.universeCategory[i] = incomingUniverse;
                            this.universeCategory.push(incomingUniverse);

                        });
                    }

                    //2. Replace the FK's with the actual move's name 
                    //console.log('CARDS: ' + JSON.stringify(this.cards));
                    //console.log('MOVES: ' + JSON.stringify(this.moves));
                    for (let i = 0; i < this.cards.length; i++) {
                        for (let j = 0; j < this.moves.length; j++) {
                            if (this.cards[i].FK_Move_1 == this.moves[j].id) {
                                //console.log('Found Match Move 1');
                                this.cards[i].FK_Move_1 = this.moves[j].name + ":  Lvl " + this.cards[i].Move1_Buff_Tally;
                                this.cards[i].FK_Move_1_Description = this.moves[j].description;
                            }
                            if (this.cards[i].FK_Move_2 == this.moves[j].id) {
                                //console.log('Found Match Move 2');
                                this.cards[i].FK_Move_2 = this.moves[j].name + ":  Lvl " + this.cards[i].Move2_Buff_Tally;
                                this.cards[i].FK_Move_2_Description = this.moves[j].description;
                            }
                            if (this.cards[i].FK_Move_3 == this.moves[j].id) {
                                //console.log('Found Match Move 3');
                                this.cards[i].FK_Move_3 = this.moves[j].name + ":  Lvl " + this.cards[i].Move3_Buff_Tally;
                                this.cards[i].FK_Move_3_Description = this.moves[j].description;
                            }
                            if (this.cards[i].FK_Move_4 == this.moves[j].id) {
                                //console.log('Found Match Move 4');
                                this.cards[i].FK_Move_4 = this.moves[j].name + ":  Lvl " + this.cards[i].Move4_Buff_Tally;
                                this.cards[i].FK_Move_4_Description = this.moves[j].description;
                            }
                            if (this.cards[i].FK_Move_Ultimate == this.moves[j].id) {
                                //console.log('Found Match Move Ultimate');
                                this.cards[i].FK_Move_Ultimate = this.moves[j].name + ":  Lvl " + this.cards[i].MoveUltimate_Buff_Tally;
                                this.cards[i].FK_Move_Ultimate_Description = this.moves[j].description;
                            }
                        }
                        
                    }

                    this.noUniverseToggle = false;
               
                }
              
                console.log("Size of card array" + this.cards.length);
              if (this.cards.length > 4) {//how I have the width in vw's > 4 universe balls will always trigger the scrollbar
                    this.ifScrollBar = true;
                }
                else {
                    this.ifScrollBar = false;
                }
                this.spinnerService.hide();
            })//remember this does ALL error handling for this form
           
        });
        this.subscription2 = this.sageUserService.getError().subscribe(incomingError => {
            this.error = "Couldn't Load Profile Data." + incomingError;
            this.response = "Please Make Sure You Are Logged In.";
            this.loadModalToggle = false;
        })//remember this does ALL error handling for this form
        
    }

    cardCount = 0;
    isValid = false;
    energy = localStorage.getItem('Energy');

    public cueCardModal(index) {
        
      this.i = index;
      this.loadModalToggle = true;
      setTimeout(() => {
          $("#cardModal").modal();
      }, 50);
  }

  public gatherSelected() {
      let selectedCards = new Array<UniverseCard>();
      return selectedCards;
  }

  public saveAll() {

  }

  public right() {
      //console.log(window.);

      let i = 10;
      var int = setInterval(function () {
          window.scrollBy(i, 0);
          i += 10;
          if (i >= 200) clearInterval(int);
      }, 20);
  }

  public left() {
      let i = 10;
      var int = setInterval(function () {
          window.scrollBy(-i, 0);
          i += 10;
          if (i >= 200) clearInterval(int);
      }, 20);
  }
 
/********************************************************************************************
Gather all that's selected up into a selected array and pass that in to the delete function
*********************************************************************************************/

  editModalToggle = true;
  universeName = '';
  universeDescription = '';
  editIndex = 0;
  public edit(i) {
      this.universeName = this.cards[i].name;
      this.universeDescription = this.cards[i].description;
      this.editIndex = i;
      this.editModalToggle = true;
      $("#editModal").modal();
  }

  moveDescription = 'N/A';
  moveName = 'N/A';
  public universeModal() {
      $("#universeModal").modal();
  }

  public moveToggle1(i) {
      this.moveName = this.cards[i].FK_Move_1;
      this.moveDescription = this.cards[i].FK_Move_1_Description;
      $("#moveModal").modal();
  }

  public moveToggle2(i) {
      this.moveName = this.cards[i].FK_Move_2;
      this.moveDescription = this.cards[i].FK_Move_2_Description;
      $("#moveModal").modal();
  }

  public moveToggle3(i) {
      this.moveName = this.cards[i].FK_Move_3;
      this.moveDescription = this.cards[i].FK_Move_3_Description;
      $("#moveModal").modal();
  }

  public moveToggle4(i) {
      this.moveName = this.cards[i].FK_Move_4;
      this.moveDescription = this.cards[i].FK_Move_4_Description;
      $("#moveModal").modal();
  }

  public moveToggleUltimate(i) {
      this.moveName = this.cards[i].FK_Move_Ultimate;
      this.moveDescription = this.cards[i].FK_Move_Ultimate_Description;
      $("#moveModal").modal();
  }

  public editSubmit() {
      this.spinnerService.show();
      if ($('#editModal').hasClass('show')) {
          $("#editModal").modal('toggle');
      }
      this.cards[this.editIndex].name = this.universeName;
      this.cards[this.editIndex].description = this.universeDescription;


      this.cardService.updateUniverseCardNameDescription(this.cards[this.editIndex], this.cards[this.editIndex].id).subscribe(response => {
          this.cards[this.editIndex] = response;
          console.log("Card Updated: " + this.cards[this.editIndex]);
          if ($('#cardModal').hasClass('show')) {
              $("#cardModal").modal('toggle');
          }
          this.ngOnInit();
      });
  }

  public sure(index) {
      if (parseInt(this.cards[index].Energy_Value) > 24) {
          $("#areYouSureModal").modal('toggle');
      }
      else {

          this.delete(index);
      }
  }

  public delete(index) {
      if ($('#areYouSureModal').hasClass('show')) {
          $("#areYouSureModal").modal('toggle');
      }// Bootstrap 4
      this.loadingMessageService.changeLoadingMessage("Destroying for means of Creation...");
      this.spinnerService.show();
      this.sub = this.cardService.destroyCard(this.cards[index], localStorage.getItem('sage_id'))
      this.sub.subscribe((energy) => {

          let totalEnergy = parseInt(this.energy) + energy;
          console.log('totalenergy' + this.energy);
          this.energy = totalEnergy.toString();
          localStorage.setItem('Energy', this.energy);
          
          //this.response = "Universes Successfully Deleted.  Refunded " + energy + " Energy!";
          console.log(JSON.stringify(energy));

      

          $("#cardModal").modal('toggle');
          setTimeout(() => {
              this.noUniverseToggle = true;
              this.loadModalToggle = false;
              this.ngOnInit();
              this.status.changeStatus('Available Energy ' + localStorage.getItem('Energy'));
          }, 50);

      }
          , err => this.sageUserService.sendError(err));
  }

              /*
  public back() {
      this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]);//has to navigate and THEN trigger the broadcast singleton
  }
        */
  public toGenerator() {
      this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') +'/universe-generator']);//has to navigate and THEN trigger the broadcast singleton
  }
}
