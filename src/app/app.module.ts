import { JulietCommonModule } from './juliet-common/juliet-common.module';
import { CalendarModule } from './calendar/calendar.module';
import { UserModule } from './user/user.module';
import { TagsModule } from './tags/tags.module';
import { GroupsModule } from './groups/groups.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CalendarModule,
    GroupsModule,
    JulietCommonModule,
    TagsModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
