import {CalendarEvent} from 'calendarUtils';

export interface AEvent extends CalendarEvent {
  id:Number,
  start:Number
  end:Number,
  author:Number,
  $perm,
  $private:Number,
  title:String,
  text:String,
  del:Boolean,
  membersMax:Number;
}
