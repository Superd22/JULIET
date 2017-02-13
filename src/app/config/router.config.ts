import { JulietCommonHelperService } from './../juliet-common/services/juliet-common-helper.service';
import { environment } from './../../environments/environment';
import { UIRouter } from "ui-router-ng2";
import { Injectable } from '@angular/core';
import * as vis from 'ui-router-visualizer';

@Injectable()
export class RouterConfig {
    constructor(router: UIRouter, juCommon:JulietCommonHelperService) {


        router.urlRouterProvider.otherwise("/");
        // Dev StateTree Debug    
        if(!environment.production) vis.visualizer(router);

        router.transitionService.onBefore({ to: "**" }, () => juCommon.closeSideNav());
    }


}