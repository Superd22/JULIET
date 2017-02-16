import { MainComponent } from './../components/index/main/main.component';
import { WeekComponent } from '../components/list/week/week.component';
import { DayComponent } from '../components/list/day/day.component';
import { MonthComponent } from '../components/list/month/month.component';
import { ArchiveComponent } from '../components/list/archive/archive.component';
import { EventComponent } from '../components/single/event/event.component';
import { Transition } from 'ui-router-ng2';

export let CalendarStates = {
    calendar: {
        name:"secure.calendar",
        url:"Calendrier/",
        views:{'content':{component: MainComponent}},
        abstract:true,
    },
    week: {
        name:"secure.calendar.week",
        component: WeekComponent,
    },
    day: {
        name:"secure.calendar.day",
        url:"jour/",
        component: DayComponent,
    },
    month: {
        name:"secure.calendar.month",
        url:"mois/",
        component: MonthComponent,
    },
    archive: {
        name:"secure.calendar.archive",
        url:"archive/",
        component: ArchiveComponent,
    },
    single: {
        name:"secure.calendar.single",
        url:"evenement/{eId:int}-:slug",
        component: EventComponent,
        resolve: [
            {
                token: '_eId',
                deps: [Transition],
                resolveFn: function (trans) {
                    return trans.params().eId;
                }
            }
        ]
    }
}