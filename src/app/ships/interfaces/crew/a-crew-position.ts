/**
 * Describes an available position/job on a given crew compliment
 */
export interface ACrewPosition {
    /** unique identifier */
    id: number;
    /** name of this position */
    name: string;
    /** the template we belong to */
    template_id: number;
    /** our daddy position */
    parent: number;
    /** display size of this position */
    size: number;
    /** amount of jobs avaliable in that position */
    amount:number;
}
