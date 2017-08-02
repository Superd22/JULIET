import { JulietCommonHelperService } from './juliet-common/services/juliet-common-helper.service';
import { MdSidenav } from '@angular/material';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'ju-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  @ViewChild(MdSidenav)
  protected sideNav: MdSidenav;
  constructor(protected juCommon: JulietCommonHelperService) { }

  ngOnInit() {
    this.juCommon.registerSideNav(this.sideNav);
  }

}
