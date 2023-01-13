import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  MyfootballCountry : String;
  MyfootballMaxAge : number;
  MyfootballMinAge : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  ionViewWillEnter(){
    //function that gets info from storage
    this.storage.get("MyfootballCountry").then((val) =>{
      this.MyfootballCountry = val
    }).catch((error)  => {
      alert("No Country Saved")
    })
    
    this.storage.get("MyfootballMaxAge").then((val) =>{
      this.MyfootballMaxAge = val
    }).catch((error)  => {
      alert("No Age Saved")
    })

    this.storage.get("MyfootballMinAge").then((val) =>{
      this.MyfootballMinAge = val
    }).catch((error)  => {
      alert("No Age Saved")
    })
  } 

  async save(){
    
    //displays error message there is no info saved into the country input box
    if (!this.MyfootballCountry) {
      const alert = await this.alertController.create({
        message: 'Please enter a country ID',
        buttons: ['OK']
      });
      await alert.present();
      return;

    } else {
    //otherwise save to storage
      this.storage.set("MyfootballCountry", this.MyfootballCountry);
    }
    
    this.storage.set("MyfootballMaxAge", this.MyfootballMaxAge);
    this.storage.set("MyfootballMinAge", this.MyfootballMinAge);
    this.navCtrl.pop();
  }

  cancel(){
    this.navCtrl.pop();
  }


}
