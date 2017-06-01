import { AShip } from './../../ships/interfaces/a-ship';
import { ShipModel } from './../../ships/interfaces/ship-model';
import { Observable } from 'rxjs/Observable';
import { StateService } from '@uirouter/angular';
import { CompleterData } from 'ng2-completer';
import { CompleterService } from 'ng2-completer';
import { tags } from './../states/tags.state';
import { ATag } from './../interfaces/a-tag';
import { JulietAPIService } from './../../juliet-common/services/juliet-api.service';
import { Injectable } from '@angular/core';
import { JulietRightsService } from '../../juliet-common/services/juliet-rights.service';
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class TagsService {

  public tags: ATag[];
  public selectedTag: ATag;
  public isLad;

  /** cache of the already polled users */
  private _cacheUsers: Map<number, ReplaySubject<ATag[]>> = new Map<number, ReplaySubject<ATag[]>>();
  /** cache of the already polled ships */
  private _cacheShips: Map<number, ReplaySubject<ATag[]>> = new Map<number, ReplaySubject<ATag[]>>();
  /** cache of the already polled shipModels */
  private _cacheShipModels: Map<number, ReplaySubject<ATag[]>> = new Map<number, ReplaySubject<ATag[]>>();
  /** cache of the already polled shipTemplates */
  private _cacheShipTemplates: Map<number, ReplaySubject<ATag[]>> = new Map<number, ReplaySubject<ATag[]>>();

  private apiNamespace = "Tags/";
  private $http;

  constructor(private api: JulietAPIService,
    public completerService: CompleterService, public state: StateService,
    public rights: JulietRightsService) {
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
  public getTags(update?: Boolean) {
    if (!this.tags || update) this.api.get(this.apiNamespace + "tags_getphp").subscribe(
      data => this.tags = data.data
    );
  }

  /**
   * Helper function to catch and fetch 
   * @param map the cache map
   * @param key the key for the current cache entry
   * @param force force update (otherwise use cache)
   * @param call the api call to make on update
   * @todo figure out if we need to buffer the maps > N entries
   */
  private fetchAndCache(map: Map<number, ReplaySubject<ATag[]>>, key: number, force: boolean, call: Observable<any>): Observable<ATag[]> {
    let cache = map.get(key);

    // Init our cache
    if (cache == null) {
      map.set(key, new ReplaySubject<ATag[]>(1));
      cache = map.get(key);
      call.subscribe((data) => {
        cache.next(data);
      });
    }
    else if (force) call.subscribe((data) => cache.next(data));

    return cache.asObservable();
  }

  /**
   * Fetch all the tags beloging to an user
   * @param user the user_id to fetch for
   * @param force force the update (will use cache otherwise)
   */
  public getUserTags(user?: number, force?: boolean): Observable<ATag[]> {
    if (!user) user = 0;

    let call = this.api.post(this.apiNamespace + "tags_getphp", { user: user }).map(
      data => data.data
    );

    return this.fetchAndCache(this._cacheUsers, user, force, call);
  }

  /**
   * Fetches all the tags belonging to a given Ship (instance)
   * @param ship the ship object to fetch for
   * @param force force the update (will use cache otherwise)
   */
  public getShipTags(ship: AShip, force?: boolean): Observable<ATag[]> {
    let call = this.api.post(this.apiNamespace + "getTagsAShip", { ship: ship }).map(
      data => data.data
    );

    return this.fetchAndCache(this._cacheShips, ship.id, force, call);
  }

  /**
   * Fetches all the tags belonging to a given ShipModel
   * @param shipModel the model to fetch for
   * @param force force the update (will use cache otherwise)
   */
  public getShipModelTags(shipModel: ShipModel, force?: boolean): Observable<ATag[]> {
    let call = this.api.post(this.apiNamespace + "getTagsShipModel", { shipModel: shipModel }).map(
      data => data.data
    );

    return this.fetchAndCache(this._cacheShipModels, shipModel.id, force, call);
  }

  public searchTags(search?: String, all?: boolean): Observable<ATag[]> {
    return this.api.post(this.apiNamespace + "tags_searchphp", { f: search, mod: all ? "ALL" : "" }).map(
      data => data.data
    );
  }

  public createTag(tagName: String): Observable<ATag> {
    if (tagName) {
      return this.api.get(this.apiNamespace + "create", { name: tagName }).map(
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

    return this.api.get(this.apiNamespace + "get", { name: _tagId, cat: _cat, all: true }).map(
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

  /**
   * Method to assign a tag to an user
   * @see assignTagShip
   * @see assignTagShipModel
   */
  public assignTag(tag: ATag, target?: Number) {
    if (!target) target = 0;
    return this.api.get(this.apiNamespace + "affect", { id: tag.id, user_id: target }).map(
      data => {
        if (!data.error) return data.data;
      }
    )
  }


  /**
   * Method to assign a tag to an user
   * @see unAssignTagShip
   * @see unAssignTagShipModel
   */
  public unAssignTag(tag: ATag, target?: Number) {
    if (!target) target = 0;
    return this.api.post(this.apiNamespace + "unaffect", { id: tag.id, user_id: target }).map(
      data => {
        if (!data.error) return data.data;
      }
    )
  }

  public assignTagShip(tag: ATag, ship: AShip) {
    return this.api.post(this.apiNamespace + "affectShip", { id: tag.id, ship: ship }).map(
      data => {
        if (!data.error) return data.data;
      }
    )
  }
  public unAssignTagShip(tag: ATag, ship: AShip) {
    return this.api.post(this.apiNamespace + "unaffectShip", { id: tag.id, ship: ship }).map(
      data => {
        if (!data.error) return data.data;
      }
    )
  }


  public assignTagShipModel(tag: ATag, ship: ShipModel) {
    return this.api.post(this.apiNamespace + "affectShipModel", { id: tag.id, shipModel: ship }).map(
      data => {
        if (!data.error) return data.data;
      }
    )
  }
  public unAssignTagShipModel(tag: ATag, ship: ShipModel) {
    return this.api.get(this.apiNamespace + "unaffectShip", { id: tag.id, shipModel: ship }).map(
      data => {
        if (!data.error) return data.data;
      }
    )
  }


  public updateTag(tag: ATag): Observable<any> {
    let t = Object.assign({}, tag);
    t.restricted = Number(tag.restricted);
    t.count = null;
    t.INFO = null;
    return this.api.get(this.apiNamespace + "update", t).map(
      data => data
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

  public has_admin(userid): Observable<Boolean> {
    if (userid == this.rights.userId) return Observable.of(true);

    return this.api.post('Rights/indexphp', { right: "USER_CAN_ADMIN_TAGS", test: "lol", user: userid }).map(function (data) {
      var hasR = false;
      if (data == "1" || data == "true") hasR = true;
      return hasR;
    });
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
