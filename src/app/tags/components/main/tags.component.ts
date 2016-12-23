import { TagsService } from './../../services/tags.service';
import { Component, OnInit } from '@angular/core';
import { Transition } from 'ui-router-ng2';

@Component({
  selector: 'app-tags',
  template: `Tags <div ui-view="tag"></div>`,
})
export class TagsComponent implements OnInit {

  isCreating = false;
  isasync = false;
  tags = [];
  shouldShowCreating;
  tagid;
  cat;
  userid;
  get_current_mod_slang;

  constructor(private TagCommon: TagsService, private trans: Transition) {
    this.TagCommon.isLad = true;
    
  }

  public getTags = function (force) {
    this.isasync = true;
    if (!force && Array.isArray(this.tags)) {
    }
    else {
      this.TagCommon.getTags().subscribe(data => {
        this.tags = data
        this.isasync = false;
      });
    }
  }

  public generateUrl(tag) {
    //return this.TagCommon.generateUrl(tag);
  }

  public isAutoType(tag) {
    //return this.TagCommon.isAutoType(tag);
  }

  ngOnInit() {
    this.shouldShowCreating = false;
    this.get_current_mod_slang = "Voir";

    //this.tagid = this.trans.params("tagid");
    //this.cat =  this.trans.params("cat");
    //this.userid =  this.trans.params("userID") ;
  }

}
