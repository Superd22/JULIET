import { MainComponent } from './../components/index/main/main.component';
import { WeekComponent } from '../components/list/week/week.component';
import { DayComponent } from '../components/list/day/day.component';
import { MonthComponent } from '../components/list/month/month.component';

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
    }
}