import { AEvent } from './a-event';

export interface ASummary {
    /* The actual target event */
    EVENT:AEvent,
    /* all the invitations for that event */
    INVIT:any,
    /* the group from which user gets is invitation */
    GROUP:any,
    /* If the user can ask to be in the event */
    canSendInv:boolean,
    /* if the user is in the event */
    IsIn:boolean,
    /* if the user has (was) asked to be in the event */
    Asked:boolean
}
