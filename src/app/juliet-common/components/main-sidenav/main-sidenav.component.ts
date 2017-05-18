import { JulietRightsService } from './../../services/juliet-rights.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-sidenav',
  templateUrl: './main-sidenav.component.html',
  styleUrls: ['./main-sidenav.component.scss']
})
export class MainSidenavComponent implements OnInit {

  private _isAdmin: boolean = false;

  constructor(private rights: JulietRightsService) {
    rights.can_admin_juliet().subscribe((canAdmin) => this._isAdmin = canAdmin);
  }

  ngOnInit() {
  }

}
