import { TsMainComponent } from './../components/ts-main/ts-main.component';
import { Ng2StateDeclaration } from '@uirouter/angular';

export let ts3:Ng2StateDeclaration[] = [
   {
        name: "secure.TS3",
        url: "TS3/",
        views: {
            'content': { component: TsMainComponent },
        }
    }
]