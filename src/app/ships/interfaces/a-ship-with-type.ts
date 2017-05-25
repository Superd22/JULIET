import { ShipModel } from './ship-model';
import { AShip } from './a-ship';

/**
 * Describes a Ship containg its own type
 */
export interface AShipWType extends AShip {
    /** the type of this ship */
    type: ShipModel;
}