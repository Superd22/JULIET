import { JulietCommonHelperService } from './../juliet-common/services/juliet-common-helper.service';
import { environment } from './../../environments/environment';
import { UIRouter, StateMatcher } from "@uirouter/angular";
import { Injector } from "@angular/core";
import * as vis from '@uirouter/visualizer';

export function RouterConfig(router: UIRouter, injector: Injector) {
    
    /**
     * For some reason, on html5 loading the router doesn't trigger a state change
     * This function checks the current url, and re-sync ui-router.
     */
    function enforce_state() {
        let parts = router.urlService.parts();

        // For some reason first slash fucks things up
        parts.path = parts.path.substr(1);

        let match = router.urlRouter.match(parts);
        
        if(match) match.rule.handler(match,parts,router);
    }


    enforce_state();

    // Dev StateTree Debug    
    if (!environment.production) vis.visualizer(router);

    const juCommon = injector.get(JulietCommonHelperService);
    router.transitionService.onBefore({ to: "**" }, () =>{juCommon.closeSideNav()});
}
