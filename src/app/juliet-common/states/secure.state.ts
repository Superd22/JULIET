import { JulietRightsService } from './../services/juliet-rights.service';
import { SecureComponent } from './../components/secure/secure.component';
import { Ng2StateDeclaration } from '@uirouter/angular';

export let secureState:Ng2StateDeclaration = {
    name: "secure",
    abstract: true,
    component: SecureComponent,
    resolve: {
        "_auth": [JulietRightsService, secureResolve],
    },
}

export function secureResolve(auth:JulietRightsService) {
    return auth.can_see_juliet();
}