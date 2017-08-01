import { LoadingComponent } from './../components/loading/loading.component';
import { Ng2StateDeclaration } from '@uirouter/angular';
export let splashState:Ng2StateDeclaration = {
    name:"Splash",
    url:"loading",
    component: LoadingComponent
}