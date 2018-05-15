import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public datosLogin: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
  ) {
    this.datosLogin = {
      username: '',
      password: '',
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(): void {
    if (this.datosLogin.username.length < 3 || this.datosLogin.password.length < 3) {
      let modalError = this.toastCtrl.create({
        duration: 2500,
        message: 'Campos incompletos, por favor complete todos los campos.',
        position: 'bottom'
      });

      modalError.present();
    }
  }
}
