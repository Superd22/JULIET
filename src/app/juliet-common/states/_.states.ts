import { unauthorizedState } from './unahtorized.state';
import { secureState } from './secure.state';
import { secureGoState } from './go.state';
import { splashState } from './loading.state';
import { loginState } from './login.state';
import { authState } from './auth.state';
import { Ng2StateDeclaration } from '@uirouter/angular';

export let STATES:Ng2StateDeclaration[] = [authState,loginState,splashState,secureGoState,secureState,unauthorizedState];