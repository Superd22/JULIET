import { JulietRightsService } from './../services/juliet-rights.service';
import { SecureComponent } from './../components/secure/secure.component';

export let secureState = {
    name: "secure",
    abstract: true,
    component: SecureComponent,
    resolve: {
        "_auth": [JulietRightsService, function(auth) {
            return auth.can_see_juliet();
        }],
    },
}