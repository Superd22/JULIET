import { GoComponent } from './../components/go/go.component';
import { Ng2StateDeclaration } from '@uirouter/angular';
export let secureGoState:Ng2StateDeclaration = {
    name:"secureGo",
    abstract:true,
    component: GoComponent
}