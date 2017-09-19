import { JulietCommonHelperService } from './../../services/juliet-common-helper.service';
import { JulietRightsService } from './../../services/juliet-rights.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-sidenav',
  templateUrl: './main-sidenav.component.html',
  styleUrls: ['./main-sidenav.component.scss']
})
export class MainSidenavComponent implements OnInit {

  /** if the current user is an admin */
  public isAdmin: boolean = false;
  /** if the current user is a sibylla logged-in user. */
  public isSibylla: boolean = false;

  @Input("floatMode")
  public floatMode: boolean = false;

  public globalLinks: IJuMainNavLink[] = [
    { targetState: "secure.user", name: "Mon profil", icon: "account_box" },
    { targetState: "secure.Hangar", name: "Hangar", icon: "account_balance" },
    { targetState: "secure.Groups.list", name: "Groupes", icon: "group" },
    { targetState: "secure.Tags.index.list", name: "T.A.G.S", icon: "local_offer" },
    { targetState: "secure.TS3", name: "TeamSpeak", icon: "record_voice_over" },
  ];
  public adminLinks: IJuMainNavLink[] = [
    { targetState: "secure.Hangar.adminTypes", name: "Admin Vaisseaux", icon: "airplanemode_active" }
  ];

  constructor(private rights: JulietRightsService, private juCommon: JulietCommonHelperService) {
    rights.can_admin_juliet().subscribe((canAdmin) => this.isAdmin = canAdmin);
    rights.can_see_juliet().subscribe((canSeeSibylla) => this.isSibylla = canSeeSibylla);
  }

  ngOnInit() {
  }

  public toggleSideNav() {
    this.juCommon.toggleSideNav();
  }

  public get show():boolean {
    return !this.juCommon.sidenav.opened;
  }

}

export interface IJuMainNavLink {
  name: string;
  targetState: string;
  icon: string;
}