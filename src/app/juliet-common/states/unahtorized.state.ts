import { UnauthorizedComponent } from './../components/unauthorized/unauthorized.component';
import { Ng2StateDeclaration } from '@uirouter/angular';

export let unauthorizedState:Ng2StateDeclaration = {
    name:"UnAuth",
    url:"erreur",
    component: UnauthorizedComponent,
    params: {
        errorMsg:"",
    }
}