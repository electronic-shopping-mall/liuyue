import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeScheduleDetailPage } from './home-schedule-detail';

@NgModule({
  declarations: [
    HomeScheduleDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeScheduleDetailPage),
  ],
})
export class HomeScheduleDetailPageModule {}
