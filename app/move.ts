import { Injectable } from '@angular/core';

@Injectable()
export class Move {
    id: string;//Sage Model is tied to Sage Account model. This model is more useful for the game itself where sageaccount model is mainly for admin stuff
    name: string;
    base_damage: string;
    base_energy: string;
    Force_Category_1: string;
    Force_Category_2: string;
    Conecpt_Cantegory_1: string;
    Concept_Cantegory_2: string;
    description: string;
    effects: string;
    ultimate: string;
    buildUpPointsNeededForUltimate: string;
}