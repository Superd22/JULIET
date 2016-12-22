import { CompleterData } from 'ng2-completer';
import { CompleterService } from 'ng2-completer';
import { tags } from './../states/tags.state';
import { ATag } from './../interfaces/a-tag';
import { JulietAPIService } from './../../juliet-common/services/juliet-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TagsService {

  public tags: ATag[];
  public selectedTag;
  public isLad;
  private apiNamespace = "Tags/";
  private $http;

  constructor(private api: JulietAPIService, public completerService: CompleterService) {
    //this.isLad = false;
  }

  public buildCompleter():CompleterData {
    var completer = this.completerService.remote(null, "name", "name");
    completer.urlFormater(term => this.api.api + this.apiNamespace + `tags_search.php?f=${term}`);
    completer.dataField("data");

    return completer;
  }

  // Gets all tags 
  public getTags() {
    this.api.get(this.apiNamespace + "tags_get.php").subscribe(
      data => this.tags = data.data
    );
  }

  public getTag(tag: String, _cat?: String);
  public getTag(tag: ATag, _cat?: String);
  public getTag(tag, _cat?) {
    if (typeof tag == "undefined" || tag == null) return;
    if (tag.id) var _tagId = tag.name;
    else var _tagId = tag;

    this.api.get(this.apiNamespace + "tags_get_single.php", { name: _tagId, category: _cat }).subscribe(
      data => {
        console.log(data.data);
        this.selectedTag = data.data;
      }
    );
  }


  // Get the specified tag
  // @param (ATag | Number) : The ATag object or its id.
  // @param (string) : The category of tag
  public generateUrl(tag, BaseUrl?) {
    var cat = tag.type;
    if (cat == 0 || cat == -1) {
      cat = "tag";
    }
    var prepend = "";
    if (this.isLad) {
      prepend = "?page=Tags";
    }
    return BaseUrl + prepend + "#/view/" + cat + "/" + encodeURIComponent(tag.name);
  }

  public isAutoType(tag) {
    if (tag) {
      return (tag.type != 0 && tag.type != 1);
    }
  }

  public has_admin(userid) {
    var promise = this.api.post('Rights/index.php', { right: "USER_CAN_ADMIN_TAGS", test: "lol", user: userid }).subscribe(function (data) {
      var hasR = false;
      if (data == "1" || data == "true") hasR = true;
      return hasR;
    });

    return promise;
  }

  public sendQuery(query) {
    var p = this.api.post('Tags/tags_resolveQuery.php', { query: query }).subscribe(function (data) {
      return data;
    });

    return p;
  }

  public getName(id, type) {
    var p = this.api.post('Tags/tags_getNameById.php', { id: id, type: type }).subscribe(function (data) {
      return data;
    });

    return p;
  }

}
