import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodSkillsPage } from './food-skills';

@NgModule({
  declarations: [
    FoodSkillsPage
  ],
  imports: [
    IonicPageModule.forChild(FoodSkillsPage),
  ],
})
export class FoodSkillsPageModule {}
