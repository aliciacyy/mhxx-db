import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {
  hubKeyQuests: any;
  allHubQuests: any;
  foodSkills: any;

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
    this.http.get("./assets/jsons/quests/HubKeyQuests.json").subscribe(data => {
      this.hubKeyQuests = data.json();
    });
    this.http.get("./assets/jsons/FoodSkills.json").subscribe(data => {
      this.foodSkills = data.json();
    });
  }

  initDatabase() {
    this.allHubQuests = [];
    let loop = (id: number) => {
      if (id > 7 && id < 11) {
        loop(id+1);
      } else {
        this.getHubQuest(id)
        .subscribe(data => {
          this.allHubQuests.push(data.json());
          if (id<15) {
            loop(id+1);
          }
        });
      }
    }
    loop(1);
  }

  getFromDatabase(){
    return this.http.get("file:///android_asset/www/assets/jsons/HubQuest3.json");
  }

  getHubQuest(number) {
    console.log('Getting quest number ' + number);
    return this.http.get("./assets/jsons/quests/s1-" + number + ".json");
  }

  getAllHubQuests() {
    console.log('Getting hubs quests');
    return this.allHubQuests;
  }

  getHubKeyQuests(){
    console.log('Getting key quests');
    return this.hubKeyQuests;
  }

  getFoodSkills() {
    return this.foodSkills;
  }

}
