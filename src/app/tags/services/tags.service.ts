import { Observable } from 'rxjs/Observable';
import { StateService } from 'ui-router-ng2';
import { CompleterData } from 'ng2-completer';
import { CompleterService } from 'ng2-completer';
import { tags } from './../states/tags.state';
import { ATag } from './../interfaces/a-tag';
import { JulietAPIService } from './../../juliet-common/services/juliet-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TagsService {

  public tags: ATag[];
  public selectedTag: ATag;
  public isLad;
  private apiNamespace = "Tags/";
  private $http;

  constructor(private api: JulietAPIService, public completerService: CompleterService, public state: StateService) {
    //this.isLad = false;
    console.log(state);
  }

  public buildCompleter(): CompleterData {
    var completer = this.completerService.remote(null, "name", "name");
    completer.urlFormater(term => this.api.api + this.apiNamespace + `tags_searchphp?f=${term}`);
    completer.dataField("data");

    return completer;
  }

  // Gets all tags 
  public getTags() {
    this.api.get(this.apiNamespace + "tags_getphp").subscribe(
      data => this.tags = data.data
    );
  }

  // Fetches all the tag for a given user
  public getUserTags(user?: Number):Observable<ATag[]> {
    if(!user) user = 0;
    return this.api.post(this.apiNamespace + "tags_getphp",{user: user}).map(
      data => data.data
    );
  }

  public searchTags(search?:String, all?:Boolean):Observable<ATag[]> {
    return this.api.post(this.apiNamespace + "tags_searchphp",{f: search, mod: all ? "ALL" : ""}).map(
      data => data.data
    );
  }

  public createTag(tagName:String):Observable<ATag> {
    if(tagName) {
      return this.api.get(this.apiNamespace + "create", {name: tagName}).map(
        data => data.data ? data.data : null
      );
    }
  }

  public getTag(tag: String, _cat?: String): Observable<ATag>;
  public getTag(tag: ATag, _cat?: String): Observable<ATag>;
  public getTag(tag, _cat?): Observable<ATag> {
    if (typeof tag == "undefined" || tag == null) return;
    if (tag.id) var _tagId = tag.name;
    else var _tagId = tag;

    return this.api.get(this.apiNamespace + "tags_get_singlephp", { name: _tagId, category: _cat }).map(
      data => data.data
    );
  }

  public getTagNameById(id: Number) {
    return this.api.get(this.apiNamespace + "getNameById", { id: id }).map(
      data => {
        if (data.data) return data.data.name;
        return false;
      }
    )
  }

  public migrateTag(tag: ATag | Number, target: ATag | Number);
  public migrateTag(tag, target) {
    if (tag.id) var _tagId = tag.id;
    else var _tagId = tag;

    if (target.id) var _targetId = target.id;
    else var _targetId = target;

    return this.api.get(this.apiNamespace + "migrate", { id: _tagId, target: _targetId }).subscribe(
      data => {
        if (data.data && this.state.is("secure.Tags.view") && !this.state.is("secure.Tags.view", { tag_name: data.data.name }))
          this.state.go("secure.Tags.view", { tag_name: data.data.name });
      }
    )
  }

  public deleteTag(tag: ATag) {
    this.api.get(this.apiNamespace + "delete", { id: tag.id }).subscribe(
      data => {
        if (this.state.is("secure.Tags.view")) this.state.go("secure.Tags.list");
      }
    )
  }

  public assignTag(tag: ATag, target?: Number) {
    if(!target) target = 0;
    this.api.get(this.apiNamespace + "affect", { id: tag.id, user_id: target }).subscribe(
      data => {
        if (this.state.is("secure.Tags.view")) this.state.reload();
      }
    )
  }

  public updateTag(tag: ATag) {
    tag.restricted = Number(tag.restricted);
    this.api.get(this.apiNamespace + "update", tag).subscribe(
      data => {
        if (this.state.is("secure.Tags.view") && !this.state.is("secure.Tags.view", { tag_name: tag.name }))
          this.state.go("secure.Tags.view", { tag_name: tag.name });
      }
    )
  }

  public updateCurrentSingleTag() {
    return this.updateTag(this.selectedTag);
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
    var promise = this.api.post('Rights/indexphp', { right: "USER_CAN_ADMIN_TAGS", test: "lol", user: userid }).subscribe(function (data) {
      var hasR = false;
      if (data == "1" || data == "true") hasR = true;
      return hasR;
    });

    return promise;
  }

  public sendQuery(query) {
    var p = this.api.post('Tags/tags_resolveQueryphp', { query: query }).subscribe(function (data) {
      return data;
    });

    return p;
  }

  public getName(id, type) {
    var p = this.api.post('Tags/tags_getNameByIdphp', { id: id, type: type }).subscribe(function (data) {
      return data;
    });

    return p;
  }

}
