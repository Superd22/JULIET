/**
 * Describes a target of a tag (ressources having said tag)
 */
export interface TagTarget {
    /** the type of the target */
    type: "user" | "ship" | "ship_type" | "ship_variant" | "ressource";
    /** the id in the db for the given type */
    id: number;
    /** a display name for this target */
    name: string;
    /** a display image for this target */
    img:string;
}