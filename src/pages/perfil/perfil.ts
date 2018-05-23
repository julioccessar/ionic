import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'perfil'
})

export class User {
  public name: string;
  public surname: string;
  public username: string;
  public password: string;
  public email: string;
  public birth: string;

  constructor(
    username: string,
    password: string,
    name: string,
    surname: string,
    email: string,
    birth: string
  ) {
    this.name = name;
    this.password = password;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.birth = birth;
  }
}
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})

export class PerfilPage {
  private localStorage: Storage;
  private user: User;
  public edit: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.localStorage = window.localStorage;
    this.user = JSON.parse(this.localStorage.getItem('user'));
    this.edit = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
    //this.user = this.navParams.get('perfil');
  }
  save() {
    this.localStorage.setItem('user', JSON.stringify(this.user));
    this.setEdit(false);
  }

  cancel() {
    this.navCtrl.push('home');
    this.setEdit(false);
  }

  setEdit(value) {
    this.edit = value;
  }
}
