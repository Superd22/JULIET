import { JuWing } from '../enums/ju-wing.enum';
import { ARank } from './a-rank';

export interface AUser {
    forum_id:Number,
    id:Number,
    fleet:JuWing,
    grade:Number|ARank,
    prenom?:String;
    nom?:String;
    callsign?:String;
    description?:String;
}
