import { AuthComponent } from './../components/auth/auth.component';
import { Ng2StateDeclaration } from '@uirouter/angular';

export let authState:Ng2StateDeclaration= {
    name:"Auth",
    url:"auth",
    component: AuthComponent
}