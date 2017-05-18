import { MainViewComponent } from './../components/main-view/main-view.component';
import { TagListComponent } from './../../tags/components/_common/tag-list/tag-list.component';
import { Observable } from 'rxjs/Observable';
import { JulietUserService } from './../../user/services/juliet-user.service';
import { SeoUrlPipe } from './../../juliet-common/pipes/seo-url.pipe';
import { JulietAPIService } from './../../juliet-common/services/juliet-api.service';
import { UserComponent } from './../../user/components/user.component';
import { HangarComponent } from './../components/hangar/hangar.component';
import { Ng2StateDeclaration, Resolvable, UIRouter, StateService, Transition } from '@uirouter/angular';
import { userSlugResolve } from "./userSlugResolve.resolve";

export let HangarViewOther: Ng2StateDeclaration = {
    name: "secure.Hangar.viewOther",
    url: '{user_id:int}-{user_slug:string}',
    views: { "hangar": { component: HangarComponent } },
    params: {
        resolved: false,
        user_slug: "",
    },
    resolve: [
        { token: "e", resolveFn: userSlugResolve, deps: [JulietUserService, Transition], policy: { when: "LAZY", async: "WAIT" } }
    ]
}

export let Hangar: Ng2StateDeclaration = {
    name: "secure.Hangar",
    views: { "content": { component: MainViewComponent } },
    url: 'Hangar/',
    redirectTo: "secure.Hangar.viewSelf",
}

export let HangarViewSelf: Ng2StateDeclaration = {
    name: "secure.Hangar.viewSelf",
    views: { "hangar": { component: HangarComponent } },
    url: '',
    params: {
        user_id: 0,
    },
    reloadOnSearch: true,
}