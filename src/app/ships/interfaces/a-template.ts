import { ATemplateCrew } from './crew/a-template-crew';
/**
 * Declares a template for a ship or a ship type
 */
export interface AShipTemplate {
    /** db unique id */
    id:number;
    /** index to the ship this is a template for */
    ship_id:number;
    /** index to the ship type this is a template for */
    ship_type_id:number;
    /** name of this template */
    name:string;
    /** crew compliment for this template */
    crew_compliment:ATemplateCrew;
}   
