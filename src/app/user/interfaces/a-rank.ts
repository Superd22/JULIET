import { JuWing } from '../enums/ju-wing.enum';

export interface ARank {
    ID: number,
    name: string,
    url: string,
    type: JuWing,
    stars: number,
    pos: number,
}
