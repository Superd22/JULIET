import { JulietCommonHelperService } from './../juliet-common/services/juliet-common-helper.service';
import { environment } from './../../environments/environment';
import { UIRouter } from "@uirouter/angular";
import { Injector } from "@angular/core";
import * as vis from '@uirouter/visualizer';

export function RouterConfig(router: UIRouter, injector: Injector) {
    // router.urlRouterProvider.otherwise("/");
    // Dev StateTree Debug    
    if (!environment.production) vis.visualizer(router);

    const juCommon = injector.get(JulietCommonHelperService);
    router.transitionService.onBefore({ to: "**" }, () => juCommon.closeSideNav());
}
