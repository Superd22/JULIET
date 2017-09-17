import { IJuGroupAffectationRessource } from './IJuGroupAffectationRessource';
import { IJuGroupAffectationShip } from './IJuGroupAffectationShip';
import { IJuGroupAffectationUser } from './IJuGroupAffectationUser';

export interface AGroup {
    /* DB ID */
    id: number,
    /* Full UTF8 Group Name */
    nom: string,
    /* Full UTF8 Description */
    description: string,
    /** header banner */
    ban: string;
    /** [DO NOT USE] legacy member param */
    members: string;
    /** Affectations inside this group */
    affectations: {
        /** ressources affected to this group */
        ressources: IJuGroupAffectationRessource[];
        /** ships affected to this group */
        ships: IJuGroupAffectationShip[];
        /** users affected to this group */
        users: IJuGroupAffectationUser[];
    }
}
