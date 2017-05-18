import { AShip } from './a-ship';
/**
 * Interface for a Hangar which holds ships
 */
export interface Hangar {
    /** array of ships held by this hangar */
    ships: AShip[];
    /** if the current user has admin rights on this hangar */
    canAdmin: boolean;
}
