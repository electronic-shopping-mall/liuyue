import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewhomeSchedulePage } from './newhome-schedule';

@NgModule({
  declarations: [
    NewhomeSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(NewhomeSchedulePage),
  ],
})
export class NewhomeSchedulePageModule {}
