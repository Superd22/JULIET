import { JuWing } from '../enums/ju-wing.enum';
import { ARank } from './a-rank';

export interface AUser {
    id_forum: number,
    id: number,
    fleet: JuWing,
    grade: number | ARank,
    prenom?: String,
    handle?: String,
    nom?: String;
    squad?: number;
    callsign?: String;
    description?: String;
    pending: Boolean;
    activite?: number;
    notif?: any;
}
