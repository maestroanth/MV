import { Injectable } from '@angular/core';

@Injectable()
export class Sage {
    id: string;//Sage Model is tied to Sage Account model. This model is more useful for the game itself where sageaccount model is mainly for admin stuff
    FK_Race: string;
    Intuition: string;
    Ingenuity: string;
    Intelligence: string;
    Inquisitiveness: string
    Invigoration: string;
    Insanity_Control: string;
    XP: string;
    Energy: string;
    Level: string;
    Chosen_Image: string;
    Sage_Created: string;
    Personality: string;
    Racial_Bonus: string;
    Race_Name: string;
}