  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { Storage } from '@ionic/storage';
  import { HomePage } from '../../pages/home/home';

  /*
    Generated class for the CountriesProvider provider.

    See https://angular.io/guide/dependency-injection for more info on providers
    and Angular DI.
  */
  @Injectable()
  export class CountriesProvider {

    API_key:string = "06afb580-8642-11ed-bf30-3fe49c45cb54"
    url:any;

    constructor(public http: HttpClient, private storage: Storage ) {
      console.log('Hello CountriesProvider Provider');
    }

    getcountry(MyfootballCountry: any){
      this.url = "https://app.sportdataapi.com/api/v1/soccer/countries/" + String(MyfootballCountry) + "?apikey=" + this.API_key
      console.log(this.url);
      return this.http.get(this.url);
    }
  }
