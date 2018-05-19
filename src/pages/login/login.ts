import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public datosLogin: any;

  private instanciaLoader: Loading;
  private localStorage: Storage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private auth: AuthProvider,
    private loadingCtrl: LoadingController
  ) {
    this.datosLogin = {
      username: '',
      password: '',
    };

    this.localStorage = window.localStorage;
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
      return;
    }
    // this.auth.login(this.datosLogin.username, this.datosLogin.password).then(
    //   success => this.successLogin(success),
    //   error => this.errorLogin(error)
    // );
    console.log('login button');
    this.mostrarLoading('Iniciando sesión');
    this.auth.loginObservable(this.datosLogin.username, this.datosLogin.password)
      .subscribe(
        success => this.successLogin(success),
        error => this.errorLogin(error)
      );

  }

  private successLogin(success): void {
    this.ocultarLoading();
    this.localStorage.setItem('logged', 'true');
    this.navCtrl.setRoot('home');
    console.log('successLogin', success);
  }

  private errorLogin(error): void {
    this.ocultarLoading();
    this.mostrarToast(1500, error, 'bottom');
    console.log('errorLogin', error);
  }

  private mostrarLoading(message: string): void {
    this.instanciaLoader = this.loadingCtrl.create({
      content: message
    });
    this.instanciaLoader.present();
  }

  private ocultarLoading(): void {
    if(this.instanciaLoader) {
      this.instanciaLoader.dismiss();
      this.instanciaLoader = null;
    }
  }

  private mostrarToast(duracion: number, mensaje: string, posicion: string): void {
    let modalError = this.toastCtrl.create({
      duration: duracion,
      message: mensaje,
      position: posicion
    });

    modalError.present();
  }
}
