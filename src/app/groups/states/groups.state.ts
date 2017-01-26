import { GroupsComponent } from './../components/groups/groups.component';

export let groupsState = {
    name: "secure.Groups",
    url: "Groups/",
    views: {
        'content': { component: GroupsComponent },
    },
}