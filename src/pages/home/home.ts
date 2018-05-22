//import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component } from '@angular/core';
import { NavController, LoadingController, IonicPage, ToastController } from 'ionic-angular';
import { PeliculasProvider } from '../../providers/peliculas/peliculas';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public datosBusqueda: any;
  public buscandoPeliculas: boolean;

  //constructor(public navCtrl: NavController, public navParams: NavParams) {
  //}

  private localStorage: Storage;

  constructor(
    public navCtrl: NavController,
    public peliculasProvider: PeliculasProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    //private ngZone: NgZone,
  ) {
    this.datosBusqueda = {};
    this.buscandoPeliculas = false;

    this.localStorage = window.localStorage;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }



  public irListadoPeliculas(): void {
    this.navCtrl.push('listado-peliculas');
  }

  public buscarPelicula(): void {
    if (!this.datosBusqueda.texto) {
      let toastError = this.toastCtrl.create({
        message: 'Ingrese texto por favor',
        duration: 1500,
        position: 'bottom'
      });
      toastError.present();
      return;
    }
    this.buscandoPeliculas = true;
    let loading = this.loadingCtrl.create({ content: 'Buscando película..' });
    loading.present();

    this.peliculasProvider.buscarPelicula(this.datosBusqueda.texto).then(
      (success) => { this.successBuscarPelicula(success, loading) },
      (error) => { this.errorBuscarPelicula(error, loading) });
  }

  private successBuscarPelicula(resultado, loading): void {
    this.buscandoPeliculas = false;
    loading.dismiss();
    let data = {
      peliculasLista: resultado
    };
    this.navCtrl.push('listado-peliculas', data);
    console.log('successBuscarPelicula', resultado);
  }

  private errorBuscarPelicula(error, loading): void {
    this.buscandoPeliculas = false;
    loading.dismiss();
    console.log('errorBuscarPelicula', error);
  }

  public listFavourites() {
    let favourites = this.localStorage.getItem('favourite');
    let arr = favourites.split(";");
    let resultado = [];
    arr.forEach(element => {
      if (element != 'null') {
        console.log(JSON.parse(element));
        let current = JSON.parse(element);
        let find = false;
        resultado.forEach(elem => {
          if (elem.imdbID === current.imdbID) {
            find = true;
          }
        });

        if (!find) resultado.push(current);

      }
    });
    let data = {
      peliculasLista: { Search: resultado }
    };
    this.navCtrl.push('listado-peliculas', data);
    console.log('successBuscarPelicula', resultado);
  }

  public showPerfil() {
    this.navCtrl.push('perfil-page');    
  }

}
