import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdSelectModule, MdSidenavModule, MdIconModule, MdProgressBarModule, MdInputModule, MdTooltipModule, MdMenuModule } from '@angular/material';
import { MdProgressSpinnerModule, MdSnackBarModule, MdToolbarModule, MdAutocompleteModule, MdCheckboxModule } from '@angular/material';
import { MdCardModule, MdTableModule, MdPaginatorModule, MdSortModule } from '@angular/material';
import { CdkTableModule } from "@angular/cdk";




let modules = [
  MdButtonModule,
  MdSelectModule,
  MdSidenavModule,
  MdIconModule,
  MdMenuModule,
  MdProgressBarModule,
  MdInputModule,
  MdTooltipModule,
  MdProgressSpinnerModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdAutocompleteModule,
  MdCheckboxModule,
  MdCardModule,
  CdkTableModule,
  MdTableModule,
  MdPaginatorModule,
  MdSortModule
];

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class JulietMaterialModule { }
