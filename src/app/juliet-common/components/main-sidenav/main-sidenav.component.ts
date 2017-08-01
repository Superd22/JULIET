import { JulietRightsService } from './../../services/juliet-rights.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private rights: JulietRightsService) {
    rights.can_admin_juliet().subscribe((canAdmin) => this.isAdmin = canAdmin);
    rights.can_see_juliet().subscribe((canSeeSibylla) => this.isSibylla = canSeeSibylla);
  }

  ngOnInit() {
  }

}
