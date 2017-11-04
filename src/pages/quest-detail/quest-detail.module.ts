import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestDetailPage } from './quest-detail';

@NgModule({
  declarations: [
    QuestDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestDetailPage),
  ],
})
export class QuestDetailPageModule {}
