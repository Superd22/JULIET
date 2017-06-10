import { ACrewMemberAffectation } from './a-crew-member-affectation';
import { ACrewPosition } from './a-crew-position';
/**
 * Describes a full crew compliment aboard a template of a ship
 */
export interface ATemplateCrew {
    /** the id of the template we're a crew of */
    template_id: number;
    /** available positions in this crew */
    positions: ACrewPosition[];
    /** currently assigned crew-men */
    crew: ACrewMemberAffectation[];
}
