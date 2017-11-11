import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestDetailPage } from '../quest-detail/quest-detail';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-quests-list',
  templateUrl: 'quests-list.html',
})
export class QuestsListPage {
  quest: any;
  listOfQuests: any;
  keyQuests: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider) {
    this.quest = navParams.get('quest');
    this.listOfQuests = this.quest.questList;
    this.keyQuests = this.dataProvider.getHubKeyQuests();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestsListPage');
  }

  questSelected(listOfQuests) {
    this.navCtrl.push(QuestDetailPage, {
      listOfQuests: listOfQuests
    });
  }

  isKey(questTitle) {
    let rankName = this.quest.id.split('-');
    let rank = rankName[rankName.length-1];
    if (parseInt(rank) > 10) {
      return this.keyQuests[parseInt(rank)-4].indexOf(questTitle) >= 0;
    } else {
      return this.keyQuests[parseInt(rank)-1].indexOf(questTitle) >= 0;
    }
  }

}
