import { HeritedFromTag } from "./herited";
import { TagTarget } from './tag-target';

export interface ATag {
    id:number;
    /** name of the tag */
    name:string;
    /** mini icon of this tag */
    img:string;
    /** if this tag is restricted or can be freely taken */
    restricted:number;
    /** type of tag */
    type:number;
    /** category of tag (ie: 'tag', 'ship', 'rank'...) */
    cat?:string;
    /** parent of this tag */
    parent?:number;
    /** parent right-wise of this tag */
    rights_from?:number;
    count?: any;
    INFO?: any;
    targets:TagTarget[];
    /** where we got that tag from */
    herited_from:HeritedFromTag;
}
