import { JulietCommonHelperService } from './juliet-common/services/juliet-common-helper.service';
import { MdSidenav } from '@angular/material';
import { Component, ViewChild } from '@angular/core';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

@Component({
  selector: 'ju-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  @ViewChild(MdSidenav)
  protected sideNav: MdSidenav;
  constructor(protected juCommon: JulietCommonHelperService, protected mScrollbarService: MalihuScrollbarService) { }

  ngOnInit() {
    $(window).on("load resize", () => {
      var winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (winWidth > 640) {
        this.mScrollbarService.initScrollbar('.mat-sidenav-container', { axis: 'y', theme: 'dark-thick', scrollInertia: 0, scrollButtons: { enable: true } });
      } else {
        this.mScrollbarService.destroy('.mat-sidenav-container');
      }
    });
    this.juCommon.registerSideNav(this.sideNav);
  }

}
