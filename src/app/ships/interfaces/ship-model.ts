/**
 * Represents a Model of Ship (RSI Aurora, Anvil Hornet, ect, ect)
 */
export interface ShipModel {
    /** the id of this ship model */
    id: number;
    /** the type of this ship */
    type: number;
    /** main icon for this ship */
    ico: string;
    /** parent for this ship */
    parent: number;
    /** name of this type */
    name: string;
}
