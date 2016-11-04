import { UIRouter } from "ui-router-ng2";
import { Injectable } from '@angular/core';
import * as vis from 'ui-router-visualizer';

@Injectable()
export class RouterConfig {
    constructor(router: UIRouter) {
        // Dev StateTree Debug    
        vis.visualizer(router);
    }


}