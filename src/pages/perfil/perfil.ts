import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  public notify: boolean;
  
  constructor(
    username: string,
    password: string,
    name: string,
    surname: string,
    email: string,
    birth: string,
    notify: boolean
  ) {
    this.name = name;
    this.password = password;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.birth = birth;
    this.notify = notify
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
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
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

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });

  }
}
