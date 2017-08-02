import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightsComponent } from './components/rights.component';

@NgModule({
  imports: [
    CommonModule,
    JulietCommonModule
  ],
  declarations: [RightsComponent]
})
export class JulietRightsModule { }
