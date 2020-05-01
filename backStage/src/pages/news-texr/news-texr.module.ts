import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsTexrPage } from './news-texr';

@NgModule({
  declarations: [
    NewsTexrPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsTexrPage),
  ],
})
export class NewsTexrPageModule {}
