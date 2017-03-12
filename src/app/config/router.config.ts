import { JulietCommonHelperService } from './../juliet-common/services/juliet-common-helper.service';
import { environment } from './../../environments/environment';
import { UIRouter } from "ui-router-ng2";  
import {Injector} from "@angular/core"; 
import * as vis from 'ui-router-visualizer';

export function RouterConfig(router: UIRouter, injector: Injector) {
    // router.urlRouterProvider.otherwise("/");
    // Dev StateTree Debug    
    // if(!environment.production) vis.visualizer(router);s

    const juCommon = injector.get(JulietCommonHelperService);
    router.transitionService.onBefore({ to: "**" }, () => juCommon.closeSideNav());
}
