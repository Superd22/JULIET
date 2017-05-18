/**
 * Main type of ship information as registered in the front-end
 */
export interface AShip {
    /** the name of the ship (can be null) */
    name: string;
    /** the id of the ship */
    id: number;
    /** the type of ship this instance is */
    type_id: number;
    /** the id of the owner of this ship */
    owner: number;
}
