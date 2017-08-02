import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';

@NgModule({
  imports: [
    CommonModule,
    JulietCommonModule
  ],
  declarations: [StatsComponent]
})
export class JulietStatsModule { }
