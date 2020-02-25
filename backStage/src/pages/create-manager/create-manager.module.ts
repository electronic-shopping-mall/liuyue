import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateManagerPage } from './create-manager';

@NgModule({
  declarations: [
    CreateManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateManagerPage),
  ],
})
export class CreateManagerPageModule {}
