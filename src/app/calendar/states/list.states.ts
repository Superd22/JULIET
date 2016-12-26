import { DayComponent } from './../components/list/day/day.component';
import { MonthComponent } from './../components/list/month/month.component';
import { WeekComponent } from './../components/list/week/week.component';
import { MainComponent } from './../components/index/main/main.component';

export let calendarListStates = {
    week: {
        name: "secure.calendar.listWeek",
        component: WeekComponent,
    },
    month: {
        name: "secure.calendar.listMonth",
        component: MonthComponent,
    },
    day: {
        name: "secure.calendar.listDay",
        component: DayComponent,
    }

}