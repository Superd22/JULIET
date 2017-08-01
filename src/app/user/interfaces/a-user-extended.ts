import { AUser } from './a-user';
import { JuWing } from '../enums/ju-wing.enum';
import { ARank } from './a-rank';

export interface AUserExtended extends AUser {
    id_forum: number,
    id: number,
    fleet: JuWing,
    avatar: string,
    grade: number,
    rank: ARank,
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
