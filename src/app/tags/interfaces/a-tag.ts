import { HeritedFromTag } from "./herited";
import { TagTarget } from './tag-target';

export interface ATag {
    id:number;
    name:string;
    img:string;
    restricted:number;
    type:number;
    cat?:string;
    parent?:number;
    rights_from?:number;
    count?: any;
    INFO?: any;
    targets:TagTarget[];
    herited_from:HeritedFromTag;
}
