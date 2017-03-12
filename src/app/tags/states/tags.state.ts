import { TagsIndexComponent } from './../components/main/tag-index.component';
import { ATag } from './../interfaces/a-tag';
import { TagsService } from './../services/tags.service';
import { Transition } from 'ui-router-ng2';
import { SingleComponent } from './../components/single/single.component';
import { SearchComponent } from './../components/search/search.component';
import { OwnerComponent } from './../components/owner/owner.component';
import { ListComponent } from './../components/list/list.component';
import { TagsComponent } from './../components/main/tags.component';

export let tags = {
    main: {
        name: "secure.Tags",
        url: "Tags/",
        views: {
            'content': { component: TagsComponent },
        },
        abstract: true,
    },
    index: {
        name: "secure.Tags.index",
        abstract: true,
        views: {
            'tag': { component: TagsIndexComponent },
        },
    },
    list: {
        name: "secure.Tags.index.list",
        url: "list",
        component: ListComponent,
    },
    owner: {
        name: "secure.Tags.index.owner",
        url: "self",
        component: OwnerComponent,
    },
    search: {
        name: "secure.Tags.index.search",
        url: "search",
        component: SearchComponent
    },
    single: {
        name: "secure.Tags.view",
        url: "view/:cat_name/:tag_name",
        views: {
            'tag': { component: SingleComponent },
        },
        resolve: [
            {
                token: '_tagName',
                deps: [Transition],
                resolveFn: resolveTagName
            },
            {
                token: '_tagCat',
                deps: [Transition],
                resolveFn: resolveTagCat
            }
        ]
    },
}

export function resolveTagName(trans:Transition) {
    return decodeURIComponent(trans.params().tag_name);
}

export function resolveTagCat(trans:Transition) {
    return trans.params().cat_name;
}
