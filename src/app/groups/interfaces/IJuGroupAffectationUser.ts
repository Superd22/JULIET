import { BaseUserInfo } from './../../user/interfaces/base-user-info';

export interface IJuGroupAffectationUser extends BaseUserInfo {
    type: "user";
    /** target group id for this affectation */
    group_id: number;
}