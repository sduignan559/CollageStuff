import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuoteProvider } from '../../providers/quote/quote';
import { SettingsPage } from '../settings/settings';
import { Storage } from '@ionic/storage';
import { CountriesProvider } from '../../providers/countries/countries';
import { FootballersProvider } from '../../providers/footballers/footballers';
import { getCombinedNodeFlags } from 'typescript';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  MyfootballCountry: number;
  MyfootballMaxAge: number;
  MyfootballMinAge: number;
  author: String;
  content: String;
  countryName: any;
  countryID: String;
  countryCode: String;
  footballerInfo: any;
  myFlagURL: String;
  themes: String[];
  success: boolean = false;
  errorMessageDisplayed:String

  constructor(
    public navCtrl: NavController,
    private quoteProvider: QuoteProvider,
    private http: HttpClient,
    private storage: Storage,
    private countriesProvider: CountriesProvider,
    private footballersProvider: FootballersProvider
  ) {}

    ngonInit(){              
      this.getFlagURL(this.countryCode)
    }


  ionViewWillEnter() {
    this.getMyfootballCountry();
    this.getMyfootballMaxAge();
    this.getMyfootballMinAge();
  }

  ionViewDidEnter() {
    this.getQuotes();

  }

  openSettings() {
    this.navCtrl.push(SettingsPage);
  }

  //get country details from storage and get data for api calls
  getMyfootballCountry() {
    this.storage
      .get('MyfootballCountry')
      .then((val) => {
        this.MyfootballCountry = val;
        console.log(val);
        console.log(this.MyfootballCountry);

        this.countriesProvider
          .getcountry(this.MyfootballCountry)
          .subscribe(
            (data: any) => {

              this.success = true;
              this.countryName = data.data.name;
              this.countryID = data.data.country_id;
              this.countryCode = data.data.country_code;

              //flag url for flag image
              this.getFlagURL(this.countryCode)
              }
            ,
            (error) => {
              this.success = false;
              this.displayError(error);
            }
          );
      })
      //handle errors from bad api calls
      .catch((error) => {
        this.success = false;
        this.errorMessageDisplayed = "CountryID doesn't exist";
      });
  }

  //get max age from storage
  getMyfootballMaxAge() {
    this.storage
      .get('MyfootballMaxAge')
      .then((val) => {
        this.MyfootballMaxAge = val;
      })
      .catch((error) => {
        alert('No Age Saved');
      });
  }

  //gen min age from storage and preform api call to sports data api
  getMyfootballMinAge() {
    this.storage
      .get('MyfootballMinAge')
      .then((val) => {
        this.MyfootballMinAge = val;

        if (this.MyfootballMaxAge == null && this.MyfootballMinAge == null) {
          this.footballersProvider
            .getFootballersbyCountry(this.MyfootballCountry)
            .subscribe((data: any) => {
              this.footballerInfo = data.data;
            });
        } else {
          this.footballersProvider
            .getFootballersbyCountryMaxAndMinAge(
              this.MyfootballCountry,
              this.MyfootballMaxAge,
              this.MyfootballMinAge
            )
            .subscribe((data: any) => {
              this.footballerInfo = data.data;
            });
        }
      })
      .catch((error) => {
        alert('No Age Saved');
      });
  }

  //get quotes from the quot api
  getQuotes() {
    this.quoteProvider.getQuotes().subscribe((data) => {
      this.author = data.author;
      this.content = data.content;
      this.themes = data.tags;
    });
  }

  //method for getting flag api
  getFlagURL(countryCode){
    this.myFlagURL ="https://flagsapi.com/" + String(this.countryCode).toUpperCase() +"/shiny/64.png"+"?" + new Date().getTime;
    console.log(this.myFlagURL);
              }

  
  

  displayError(error: any) {
    // if no data in storage
     if(this.MyfootballCountry === null){
      this.errorMessageDisplayed = "CountryID doesn't exist"
     }
     // if a bad number is entered
     else if (error.status === 404) {
      this.errorMessageDisplayed = "CountryID " + this.MyfootballCountry + " doesn't exist"
      console.log('API fail');
    } else {
      this.errorMessageDisplayed = error
      console.log('An error occurred:', error);
    }
  }
}
