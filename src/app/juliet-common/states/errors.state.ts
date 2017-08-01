import { ErrorsComponent } from './../components/errors/errors.component';
import { GoComponent } from './../components/go/go.component';
import { Ng2StateDeclaration } from '@uirouter/angular';
import { ErrorUnauthorizedComponent } from "../components/errors/unauthorized/unauthorized.component";

export let secureError: Ng2StateDeclaration = {
    name: "secure.error",
    views: { "content": { component: ErrorsComponent } },
    url: 'erreur/'
}

export let secureErrorUnAuthorized: Ng2StateDeclaration = {
    name: "secure.error.unauthorized",
    url: 'unauthorized',
    params: {
        /** @param [string] the name of the required right we failed getting */
        required: null,
    },
    views: { "error": { component: ErrorUnauthorizedComponent } },
}