import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-quest-detail',
  templateUrl: 'quest-detail.html',
})
export class QuestDetailPage {
  listQuest: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.listQuest = navParams.get('listOfQuests');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestDetailPage');
  }

}
