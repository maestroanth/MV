import { Injectable } from '@angular/core';

@Injectable()
export class Universe {
    id: string;//Sage Model is tied to Sage Account model. This model is more useful for the game itself where sageaccount model is mainly for admin stuff
    name: string;
    description: string;
    image_path: string;
    Like_Ours: string;
    Rarity: string;


    Force_1: string;
    Force_Str_1: string;
    Force_2: string;
    Force_Str_2: string;
    Force_3: string
    Force_Str_3: string;

    Concept_1: string;
    Concept_Str_1: string;
    Concept_2: string;
    Concept_Str_2: string;
    Concept_3: string;
    Concept_Str_3: string;

    FK_Move_1_Default: string;
    FK_Move_2_Default: string;
    FK_Move_3_Default: string;
    FK_Move_4_Default: string;
    FK_Move_Ultimate_Default: string;

    Multiplier: number;
    generator_js_code: string;


}