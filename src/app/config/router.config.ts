import { environment } from './../../environments/environment';
import { UIRouter } from "ui-router-ng2";
import { Injectable } from '@angular/core';
import * as vis from 'ui-router-visualizer';

@Injectable()
export class RouterConfig {
    constructor(router: UIRouter) {


        router.urlRouterProvider.otherwise("/");
        // Dev StateTree Debug    
        //if(!environment.production) vis.visualizer(router);
    }


}