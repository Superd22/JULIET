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
        component: TagsComponent,
        abstract: true,
    },
    list: {
        name: "secure.Tags.list",
        url: "list",
        component: ListComponent,
    },
    owner: {
        name: "secure.Tags.owner",
        url: "self",
        component: OwnerComponent,
    },
    search: {
        name: "secure.Tags.search",
        url: "search",
        component: SearchComponent
    },
    single: {
        name: "secure.Tags.view",
        url: "view/:cat_name/:tag_name",
        views: {
            '@': { component: SingleComponent },
        },
        resolve: [
            {
                token: '_tagName',
                deps: [Transition],
                resolveFn: function (trans) {
                    return trans.params().tag_name;
                }
            },
            {
                token: '_tagCat',
                deps: [Transition],
                resolveFn: function(trans) {
                    return trans.params().cat_name;
                }
            }
        ]
    },
}
