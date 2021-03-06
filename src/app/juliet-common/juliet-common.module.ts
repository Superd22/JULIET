import { ErrorUnauthorizedComponent } from './components/errors/unauthorized/unauthorized.component';
import { SeoUrlPipe } from './pipes/seo-url.pipe';
import { JulietMaterialModule } from './material/material.module';
import { JulietCommonHelperService } from './services/juliet-common-helper.service';
import { JuV3BluePannelComponent } from './components/_exports/ju-v3-blue-pannel/ju-v3-blue-pannel.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SplashComponent } from './components/_common/splash/splash.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { JulietRightsService } from './services/juliet-rights.service';
import { CountPipe } from './pipes/count.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { JuV3HeadingComponent } from './components/_exports/ju-v3-heading/ju-v3-heading.component';
import { EnumKeysPipe } from './pipes/enum-keys.pipe';
import { JulietAPIService } from './services/juliet-api.service';
import { JuV3TabComponent } from './components/_exports/ju-v3-tab/ju-v3-tab.component';
import { JuV3SubPannelComponent } from './components/_exports/ju-v3-sub-pannel/ju-v3-sub-pannel.component';
import { V3PannelTitle } from './components/_exports/ju-v3-pannel/title/title.component';
import { JuV3PannelComponent } from './components/_exports/ju-v3-pannel/ju-v3-pannel.component';
import { MdProgressBarModule, MaterialModule } from '@angular/material';
import { STATES } from './states/_.states';
import { UIRouterModule } from '@uirouter/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JulietCommonComponent } from './components/juliet-common.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { SecureComponent } from './components/secure/secure.component';
import { GoComponent } from './components/go/go.component';
import { LayoutMarginDirective } from './directives/layout-margin.directive';
import { LayoutPaddingDirective } from './directives/layout-padding.directive';
import { ErrorsComponent } from './components/errors/errors.component';
import { BackgroundComponent } from './components/background/background.component';

@NgModule({
  imports: [
    CommonModule,
    UIRouterModule.forChild({
      states: STATES
    }),
    JulietMaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  exports: [
    JuV3PannelComponent, V3PannelTitle, JuV3SubPannelComponent, JuV3TabComponent, EnumKeysPipe, JuV3HeadingComponent, FilterPipe, CountPipe,
    SplashComponent, JuV3BluePannelComponent, SeoUrlPipe, BackgroundComponent
  ],
  declarations: [
    JulietCommonComponent, AuthComponent, LoadingComponent, LoginComponent, SecureComponent,
    GoComponent, JuV3PannelComponent, V3PannelTitle, JuV3SubPannelComponent, JuV3TabComponent, EnumKeysPipe,
    JuV3HeadingComponent, FilterPipe, CountPipe, UnauthorizedComponent, SplashComponent, JuV3BluePannelComponent,
    LayoutMarginDirective,LayoutPaddingDirective, SeoUrlPipe, ErrorsComponent, ErrorUnauthorizedComponent, BackgroundComponent
  ],
  providers: [
    JulietAPIService, JulietRightsService, JulietCommonHelperService
  ]
})
export class JulietCommonModule { }
