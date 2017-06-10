import { BaseUserInfo } from './../../../user/interfaces/base-user-info';
/**
 * Describes a crew-member affectation to a specific crew compliment
 */
export interface ACrewMemberAffectation {
    /** unique id of this affectation */
    id: number;
    /** unique id of the template we're a crew of */
    template_id: number;
    /** id of the user */
    user_id: number;
    /** id of the job we occupy in the crew */
    job_id: number;
    /** base information on our user */
    user: BaseUserInfo;
}
