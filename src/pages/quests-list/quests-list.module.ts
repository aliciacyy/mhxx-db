import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestsListPage } from './quests-list';

@NgModule({
  declarations: [
    QuestsListPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestsListPage),
  ],
})
export class QuestsListPageModule {}
