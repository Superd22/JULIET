import { Injectable } from '@angular/core';
import { JulietAPIService } from './../../juliet-common/services/juliet-api.service';
import { Http } from '@angular/http';

@Injectable()
export class RanksService {
  loading = true;

  constructor(private api: JulietAPIService) { }

  public getRanks() {
    return this.api.get("Ranks/getAllRanks.php").subscribe(function(data) {
      return data;
    });
  }

  public hasAdmin() {
    this.loading = true;
    return this.api.post("Rights/index.php", {right: "USER_CAN_ADMIN_RANKS"} ).subscribe(function(data) {
      var r = false;
      if(data == "1" || data == "true") r = true;

      this.loading = false;

      return r;
     });     
  }

  public getUserName() {
    this.loading = true;
    return this.api.post("API/get_users_by_id.php", {user: 1} ).subscribe(function(data) {
      var str = data;

      this.loading = false;
      return str.replace(/"/g, '');
    });   
  }

  public updateRan(rank, mod) {
    var m = mod || "mod"

    var post = {mod: m, rank: rank};
    return this.api.post("Ranks/editRank.php", post).subscribe(function(data) {
      return data;
    });
  }

  public getUserRank() {
    this.loading = true;
      return this.api.get("Ranks/getUserRank.php").subscribe(function(data) {

        this.loading = false;
        return data;
      });      
  }


}
