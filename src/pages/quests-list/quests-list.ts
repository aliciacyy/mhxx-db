import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestDetailPage } from '../quest-detail/quest-detail';

@IonicPage()
@Component({
  selector: 'page-quests-list',
  templateUrl: 'quests-list.html',
})
export class QuestsListPage {
  quest: Quest;
  listOfQuests: ListOfQuests[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.quest = navParams.get('quest');
    this.listOfQuests = this.quest.listOfQuests;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestsListPage');
  }

  questSelected(listOfQuests) {
    this.navCtrl.push(QuestDetailPage, {
      listOfQuests: listOfQuests
    });
  }

}
