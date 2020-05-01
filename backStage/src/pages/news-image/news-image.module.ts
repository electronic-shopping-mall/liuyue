import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsImagePage } from './news-image';

@NgModule({
  declarations: [
    NewsImagePage,
  ],
  imports: [
    IonicPageModule.forChild(NewsImagePage),
  ],
})
export class NewsImagePageModule {}
