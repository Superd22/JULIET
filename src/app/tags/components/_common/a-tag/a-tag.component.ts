import { ATag } from './../../../interfaces/a-tag';
import { TagsModule } from './../../../tags.module';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'a-tag',
  templateUrl: './a-tag.component.html',
  styleUrls: ['./a-tag.component.scss']
})
export class ATagComponent implements OnInit {

  @Input()
  public tag:ATag;

  constructor() { }

  ngOnInit() {
  }

}
