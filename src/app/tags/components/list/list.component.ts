import { TagsService } from './../../services/tags.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private tagsAPI:TagsService) { }

  ngOnInit() {
    console.log(this.tagsAPI);
    this.tagsAPI.getTags();
  }

}
