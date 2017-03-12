import { JulietRightsService } from './../services/juliet-rights.service';
import { SecureComponent } from './../components/secure/secure.component';

export let secureState = {
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