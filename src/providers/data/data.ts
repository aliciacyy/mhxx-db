import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }

  getFromDatabase(){
    return this.http.get("file:///android_asset/www/assets/jsons/HubQuest3.json");
  }
}
