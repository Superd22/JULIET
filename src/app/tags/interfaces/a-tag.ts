import { HeritedFromTag } from "./herited";

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
    herited_from:HeritedFromTag;
}
