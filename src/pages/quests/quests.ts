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
    this.quests = [];

    this.dataProvider.getFromDatabase()
    .subscribe(data => {
      this.questItem = data.json();
      for (let i = 0; i < this.questItem.length; i++) {
          this.quests.push(this.questItem[i]);
        }
    });

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
