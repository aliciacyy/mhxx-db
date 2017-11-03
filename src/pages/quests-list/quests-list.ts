import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QuestsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quests-list',
  templateUrl: 'quests-list.html',
})
export class QuestsListPage {
  quest: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.quest = navParams.get('quest');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestsListPage');
  }

}
