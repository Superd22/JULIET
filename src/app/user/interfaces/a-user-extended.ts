import { AUser } from './a-user';
import { JuWing } from '../enums/ju-wing.enum';
import { ARank } from './a-rank';

export interface AUserExtended extends AUser {
    id_forum:Number,
    id:Number,
    fleet:JuWing,
    avatar:String,
    grade:Number,
    rank:ARank,
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
