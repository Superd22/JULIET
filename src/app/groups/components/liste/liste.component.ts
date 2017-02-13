import { Component, OnInit } from '@angular/core';
import { JulietGroupsService } from '../../services/juliet-groups.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {

  protected busy = false;

  constructor(public groupApi:JulietGroupsService) { }

  ngOnInit() {
    this.busy = true;
    this.groupApi.listGroups().subscribe(
      data => this.busy = false
    )
  }

}
