import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestsListPage } from '../quests-list/quests-list';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-quests',
  templateUrl: 'quests.html',
})
export class QuestsPage {
  quests: Array<{title: string, listOfQuests: ListOfQuests[]}>;
  questItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider) {
    this.quests = this.dataProvider.getAllHubQuests();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestsPage');
  }

  questSelected(quest) {
    this.navCtrl.push(QuestsListPage, {
      quest: quest
    });
  }

}
