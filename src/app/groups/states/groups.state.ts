import { JuV3FullGroupComponent } from './../components/group/group.component';
import { GroupsComponent } from './../components/groups/groups.component';
import { ListeComponent } from '../components/liste/liste.component';

export let GroupsState = {
    index: {
        name: "secure.Groups",
        url: "Groups/",
        views: {
            'content': { component: GroupsComponent },
        },
        abstract: true,
    },
    list: {
        name: "secure.Groups.list",
        component: ListeComponent,
    },
    single: {
        url: '{groupId:int}-{groupSlug:string}',
        name: "secure.Groups.single",
        component: JuV3FullGroupComponent,
    }
}