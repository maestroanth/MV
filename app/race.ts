import { Injectable } from '@angular/core';

@Injectable()
export class Race {
    id: string;
    birth_universe: string;
    race_name: string;
    base_intuition: string;
    base_ingenuity: string;
    base_intelligence: string;
    base_inquisition: string
    base_invigoration: string;
    base_insanity_control: string;
    bonus_points_at_creation: string;
    racial_bonuses: string

    description: string;
    starting_personality: string;
    dimensional_wake: string;
    is_locked: string

    is_metaphysical: string;
    image_1: string;
    image_2: string;
    image_3: string

}