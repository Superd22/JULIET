import { UserComponent } from './../../user/components/user.component';
import { HangarComponent } from './../components/hangar/hangar.component';
import { Ng2StateDeclaration } from '@uirouter/angular';

export let Hangar: Ng2StateDeclaration = {
    name: "secure.Hangar",
    url: 'Hangar/',
    views: { "content": { component: HangarComponent } },
    params: {
        user_id: null,
    },
}