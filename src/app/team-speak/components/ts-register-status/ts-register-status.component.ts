import { JulietTsService } from './../../services/juliet-ts.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'ts-register-status',
  templateUrl: './ts-register-status.component.html',
  styleUrls: ['./ts-register-status.component.scss']
})
export class TsRegisterStatusComponent implements OnInit {

  public user;
  public status;
  public tokenUrl;
  public token;
  public busy: Boolean = false;

  constructor(public ts3: JulietTsService, public snackBar: MdSnackBar, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.checkUserStatus();
  }

  public checkUserStatus(update?: Boolean) {
    this.busy = true;
    this.ts3.getCurrentUserStatus().subscribe(
      data => {
        this.status = data.STATUS;
        // User is registered on TS
        if (this.status)
          this.user = data.tsUser;
        else {
          this.tokenUrl = this.sanitizer.bypassSecurityTrustUrl('ts3server://starcitizen.fr?token=' + data.token);
          this.token = data.token;
        }

        if (update) {
          this.snackBar.open(this.snackMessage(), null, {
            duration: 5000,
          });
        }

          this.busy = false;
      }
    )
  }

  public snackMessage():string {
    return this.status ? "Le compte a bien été crée !" : "Le compte a bien été supprimé";
  }

  public deleteUser() {
    this.busy = true;
    this.ts3.deleteUser().subscribe(
      data => {
        this.busy = false;
        this.checkUserStatus(true)
      }
    )
  }


}
