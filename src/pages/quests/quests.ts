import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestsListPage } from '../quests-list/quests-list';

/**
 * Generated class for the QuestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 interface ListOfQuests {
 titleJa: string,
 titleEn: string,
 main: string
 }

@IonicPage()
@Component({
  selector: 'page-quests',
  templateUrl: 'quests.html',
})
export class QuestsPage {
  quests: Array<{title: string, listOfQuests: ListOfQuests[]}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.quests = [];
    for (let i = 1; i < 8; i++) {
      this.quests.push({
        title: String(i),
        listOfQuests: [{
          titleJa: "心火の斬竜炉",
          titleEn: "Flames of Glavenus Passion",
          main: "Hunt a Glavenus"
        },
        {
          titleJa: "轟竜ティガレックス",
          titleEn: "Tigrex by the Tail ",
          main: "Hunt a Tigrex"
        }
      ]
      });
    }
    for (let i = 1; i < 5; i++) {
      this.quests.push({
        title: 'G' + String(i),
        listOfQuests: [{
          titleJa: "心火の斬竜炉",
          titleEn: "Flames of Glavenus Passion",
          main: "Hunt a Glavenus"
        }]
      });
    }
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
