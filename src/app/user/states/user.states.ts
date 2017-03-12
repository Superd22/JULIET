import { UserComponent } from '../components/user.component';
import { Transition } from 'ui-router-ng2';
export let user = {
    main: {
        name: "secure.user",
        url:"User/:user_id",
        views:{"content":{component:UserComponent}},
        params: {
            user_id:null,
        },
        resolve: [
            {
                token: '_userId',
                deps: [Transition],
                resolveFn: resolveUserId
            },
        ],
    }
}

export function resolveUserId(trans:Transition) {
    return trans.params().user_id;
}