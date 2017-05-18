import { MainViewComponent } from './../components/main-view/main-view.component';
import { TagListComponent } from './../../tags/components/_common/tag-list/tag-list.component';
import { Observable } from 'rxjs/Observable';
import { JulietUserService } from './../../user/services/juliet-user.service';
import { SeoUrlPipe } from './../../juliet-common/pipes/seo-url.pipe';
import { JulietAPIService } from './../../juliet-common/services/juliet-api.service';
import { UserComponent } from './../../user/components/user.component';
import { HangarComponent } from './../components/hangar/hangar.component';
import { Ng2StateDeclaration, Resolvable, UIRouter, StateService, Transition } from '@uirouter/angular';

export let HangarViewOther: Ng2StateDeclaration = {
    name: "secure.Hangar.viewOther",
    url: '{user_id:int}-{user_slug:string}',
    views: { "hangar": { component: HangarComponent } },
    params: {
        resolved: false,
        user_slug: "",
    },
    resolve: [
        new Resolvable("e", userSlugResolve, [JulietUserService, Transition], { when: "LAZY", async: "WAIT" }),
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

export async function userSlugResolve(api: JulietUserService, transition: Transition) {
    let params: { user_id: number, resolved: boolean, user_slug: string } = Object.assign({}, transition.params("to"));

    //if (params.resolved) return true;
    if (params.user_id == 0) {
        return transition.router.stateService.go("secure.Hangar", null, { notify: false, reload: false });
    }

    return api.getUserNameFromId(params.user_id).subscribe((info) => {
        params.user_slug = new SeoUrlPipe().transform(info.username);
        params.resolved = true;
        return transition.router.stateService.go(transition.$to().name, params, { notify: false, reload: false });
    });
}