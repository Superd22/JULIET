import { JulietCommonHelperService } from './../juliet-common/services/juliet-common-helper.service';
import { environment } from './../../environments/environment';
import { UIRouter, StateMatcher } from "@uirouter/angular";
import { Injector } from "@angular/core";
import * as vis from '@uirouter/visualizer';

export function RouterConfig(router: UIRouter, injector: Injector) {

    let uiTrans: boolean = false;

    /**
     * For some reason, on html5 loading the router doesn't trigger a state change
     * This function checks the current url, and re-sync ui-router.
     */
    function enforce_state() {
        let parts = router.urlService.parts();

        // For some reason first slash fucks things up
        parts.path = parts.path.substr(1);

        let match = router.urlRouter.match(parts);
        if (match) match.rule.handler(match.match, parts, router);
    }


    enforce_state();

    /**
     * For some reason html5 the router doesn't trigger for a prev/next browser either...
     */
    router.urlService.onChange((test) => {
        if (!uiTrans) enforce_state();
        uiTrans = false;
    });

    // Dev StateTree Debug    
    // if (!environment.production) vis.visualizer(router);

    const juCommon = injector.get(JulietCommonHelperService);
    router.transitionService.onBefore({ to: "**" }, () => {
        juCommon.closeSideNav();
        uiTrans = true;
    });
}
