import { JuWing } from '../enums/ju-wing.enum';
import { ARank } from './a-rank';

export interface AUser {
    id_forum: number,
    id: number,
    fleet: JuWing,
    grade: number | ARank,
    prenom?: string,
    handle?: string,
    nom?: string;
    squad?: number;
    callsign?: string;
    description?: string;
    pending: boolean;
    activite?: number;
    notif?: any;
}
