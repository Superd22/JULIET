import { IJuGroupAffectationShip } from './IJuGroupAffectationShip';
import { IJuGroupAffectationUser } from './IJuGroupAffectationUser';
import { IJuGroupAffectationRessource } from './IJuGroupAffectationRessource';

export type IJuGroupAffectation = IJuGroupAffectationRessource | IJuGroupAffectationShip | IJuGroupAffectationUser;