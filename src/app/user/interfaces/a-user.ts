import { JuWing } from '../enums/ju-wing.enum';
import { ARank } from './a-rank';

export interface AUser {
    id_forum:Number,
    id:Number,
    fleet:JuWing,
    grade:Number|ARank,
    prenom?:String,
    handle?:String,
    nom?:String;
    squad?:Number;
    callsign?:String;
    description?:String;
    pending:Boolean;
    activite?:Number;
    notif?:any;
}
