import { Injectable } from '@angular/core';

@Injectable()
export class UniverseCard {
    id: string;//Sage Model is tied to Sage Account model. This model is more useful for the game itself where sageaccount model is mainly for admin stuff
    name: string;//user can enter their own name
    description: string;//user can enter their own description
    FK_base_universe: string;


    Force_Name_1: string;
    Strength_Force_1: string;
    Force_Name_2: string;
    Strength_Force_2: string;
    Force_Name_3: string;
    Strength_Force_3: string;
    Force_Name_4: string
    Strength_Force_4: string;

    Concept_Name_1: string;
    Strength_Concept_1: string;
    Concept_Name_2: string;
    Strength_Concept_2: string;
    Concept_Name_3: string;
    Strength_Concept_3: string;
    Concept_Name_4: string;
    Strength_Concept_4: string;

    /*There is an extra force and concept slot to give room
    for user's changes*/

    FK_Move_1: string;
    Move1_Buff_Tally: string;
    FK_Move_1_Description: string;

    FK_Move_2: string;
    Move2_Buff_Tally: string;
    FK_Move_2_Description: string;

    FK_Move_3: string;
    Move3_Buff_Tally: string;
    FK_Move_3_Description: string;

    FK_Move_4: string;
    Move4_Buff_Tally: string;
    FK_Move_4_Description: string;

    FK_Move_Ultimate: string;
    MoveUltimate_Buff_Tally: string;
    FK_Move_Ultimate_Description: string;

    Energy_Value: string;

    Birth_URL: string;

    Created_By: string;


}