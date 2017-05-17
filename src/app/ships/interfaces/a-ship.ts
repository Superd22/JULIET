/**
 * Main type of ship information as registered in the front-end
 */
export interface AShip {
    /** the name of the ship (can be null) */
    name: String;
    /** the id of the ship */
    id: Number;
    /** the type of ship this instance is */
    type_id: Number;
    /** the id of the owner of this ship */
    owner: Number;
}
