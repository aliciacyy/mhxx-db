import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-food-skills',
  templateUrl: 'food-skills.html',
})
export class FoodSkillsPage {
  foodSkills: any;
  shownGroup: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider) {
    this.foodSkills = this.dataProvider.getFoodSkills();
    console.log(this.foodSkills);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodSkillsPage');
  }

  toggleGroup = function(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown = function(group) {
    return this.shownGroup === group;
  };

}
