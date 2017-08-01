import { Transition } from '@uirouter/angular';
import { LoginComponent } from './../components/login/login.component';
import { Ng2StateDeclaration } from '@uirouter/angular';

export let loginState:Ng2StateDeclaration = {
    name: "Login",
    url: "login",
    component: LoginComponent,
    params: {
        targetState: "secure.Default",
    },
    resolve: {
        "_targetState": [Transition, loginTrans],
    },
}

export function loginTrans(trans:Transition) {
    return trans.params().targetState;
}