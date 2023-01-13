import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the QuoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuoteProvider {

  constructor(public http: HttpClient) {
    console.log('Hello QuotesProvider Provider');
  }
  
  getQuotes() : Observable<any>{
    return this.http.get("https://api.quotable.io/random")
  }


}
