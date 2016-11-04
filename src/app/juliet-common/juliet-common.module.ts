import { MaterialModule } from '@angular/material';
import { STATES } from './states/_.states';
import { UIRouterModule } from 'ui-router-ng2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JulietCommonComponent } from './components/juliet-common.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { SecureComponent } from './components/secure/secure.component';
import { GoComponent } from './components/go/go.component';

@NgModule({
  imports: [
    CommonModule,
    UIRouterModule.forChild({
      states:STATES
    }),
    MaterialModule,
  ],
  declarations: [JulietCommonComponent, AuthComponent, LoadingComponent, LoginComponent, SecureComponent, GoComponent]
})
export class JulietCommonModule { }
