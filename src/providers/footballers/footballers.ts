import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';

/*
  Generated class for the FootballersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FootballersProvider {

  API_key:string = "224af210-8874-11ed-be46-35f0a7f585ce"
  footballersURL:any;

  constructor(public http: HttpClient) {
    console.log('Hello FootballersProvider Provider');
  }

  getFootballersbyCountry(MyfootballCountry: any){
    this.footballersURL = "https://app.sportdataapi.com/api/v1/soccer/players?apikey="+this.API_key+"&country_id=" + String(MyfootballCountry)
    console.log(this.footballersURL);
    return this.http.get(this.footballersURL);
  }

  getFootballersbyCountryMaxAndMinAge(MyfootballCountry: any ,MyfootballMaxAge:any, MyfootballMinAge:any){
    this.footballersURL = "https://app.sportdataapi.com/api/v1/soccer/players?apikey="+this.API_key+"&country_id=" + String(MyfootballCountry)+"&max_age=" + String(MyfootballMaxAge) + "&min_age=" +  String(MyfootballMinAge)
    console.log(this.footballersURL);
    return this.http.get(this.footballersURL);
  }


}
