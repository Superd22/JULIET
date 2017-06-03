import { TagTarget } from './tag-target';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ATag } from './a-tag';

export class TagXTakenEventEmitter extends ReplaySubject<{ tag: ATag, target_id: number, target_type: "user" | "ship" | "shipModel" | "shipTemplate", original: TagTarget }> {

    public constructor() {
        super();
    }

}