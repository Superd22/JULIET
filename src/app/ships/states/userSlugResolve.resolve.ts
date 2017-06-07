import { Transition } from '@uirouter/angular';
import { JulietUserService } from './../../user/services/juliet-user.service';
import { SeoUrlPipe } from './../../juliet-common/pipes/seo-url.pipe';
import { JulietAPIService } from './../../juliet-common/services/juliet-api.service';

export async function userSlugResolve(api: JulietUserService, transition: Transition) {
    let params: { user_id: number, resolved: boolean, user_slug: string } = Object.assign({}, transition.params("to"));

    //if (params.resolved) return true;
    if (params.user_id == 0) {
        return transition.router.stateService.go("secure.Hangar", null, { notify: false, reload: false });
    }

    /**
     * @todo FIX THIS
     */
    return api.getUserNameFromId(params.user_id, true).subscribe((info) => {
        params.user_slug = new SeoUrlPipe().transform(info.username);
        params.resolved = true;
        return transition.router.stateService.go(transition.$to().name, params, { notify: false, reload: false });
    });
}