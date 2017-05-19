import { JulietRightsService } from './../../../juliet-common/services/juliet-rights.service';
import { TagListComponent } from './../../../tags/components/_common/tag-list/tag-list.component';
import { Subscription } from 'rxjs/Subscription';
import { ATag } from './../../../tags/interfaces/a-tag';
import { TagsService } from './../../../tags/services/tags.service';
import { AShipLabelComponent } from './../my-ships/a-ship-label/a-ship-label.component';
import { JulietHangarService } from './../../services/juliet-hangar.service';
import { JulietShipsService } from './../../services/juliet-ships.service';
import { AShip } from './../../interfaces/a-ship';
import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ju-ship-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleShipViewverComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  public ship: AShip;
  @Input()
  private _shipID: number;
  @Input()
  public shipComponent: AShipLabelComponent;
  public currentUserCan = false;

  @ViewChildren(TagListComponent)
  public tagLists: QueryList<TagListComponent>;
  public tagList: TagListComponent;

  /** tags of our ship */
  public tags: ATag[] = [];
  public filteredTags = {
    count: null,
    original: null,
  };
  constructor(private api: JulietShipsService, public hangarAPI: JulietHangarService, public tagsAPI: TagsService, public rights: JulietRightsService) { }

  ngOnInit() {
    console.log("TEST");
  }


  ngAfterViewInit(): void {
    let u = this.tagLists.changes.subscribe((comps: QueryList<TagListComponent>) => {
      setTimeout(() => {
        this.tagList = comps.first;
        this.initShip();
        u.unsubscribe();
      }, 0);
    });
  }

  private initShip() {
    if (this.ship) this._shipID = this.ship.id;

    // Load the tags of this ship
    this.fetchTagList();

    // Make sure we have all the tags loaded.
    this.tagsAPI.getTags();

    // Check if we can edit the tags of this ship
    this.rights.user_can("USER_CAN_EDIT_SHIP_TAGS", 0, this.hangarAPI.currentSingleShip.ship.id).subscribe( (data) => {
      console.log(data);
      if(!data.error) {
        this.currentUserCan = data.data;
      }
    });

    //else this.ship
  }

  public fetchTagList() {
    console.log("fetching for");
    console.log(this.hangarAPI.currentSingleShip.ship);
    this.tagsAPI.getShipTags(this.hangarAPI.currentSingleShip.ship).subscribe((tags) => this.tags = tags);
  }

  public shouldAddTag() {
    if (this.tagList == null) return false;
    if (this.tagList.searchHasExactMatch() || !(this.tagList.filter.name)) return false;

    let filtered = this.filteredTags.original;
    if (filtered && filtered.filter(tag => tag.name.toLowerCase() === this.tagList.filter.name.toLowerCase().trim()).length > 0)
      return false;

    return true;
  }

  public addTag() {
    this.tagsAPI.createTag(this.tagList.filter.name).subscribe(
      tag => {
        this.tagsAPI.assignTagShip(tag, this.hangarAPI.currentSingleShip.ship).subscribe();
        this.tagList.filter.name = "";
        this.fetchTagList();
      }
    );
  }

  public takeTag(newtag: ATag) {
    this.assignTag(newtag);
    this.tagList.filter.name = "";
  }

  public assignTag(newtag: ATag) {
    this.tagsAPI.assignTagShip(newtag, this.hangarAPI.currentSingleShip.ship).subscribe(() => {
      this.tags.push(newtag);
     });
  }

  public unAssignTag(oldtag: ATag) {
    this.tagsAPI.unAssignTagShip(oldtag, this.hangarAPI.currentSingleShip.ship).subscribe(() => {
      this.tags = this.tags.filter( (tag)  => {
        return tag.id != oldtag.id;
      });
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
