import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestsPage } from './quests';

@NgModule({
  declarations: [
    QuestsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestsPage),
  ],
})
export class QuestsPageModule {}
