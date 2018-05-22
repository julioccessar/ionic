import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'detalle-pelicula'
})
@Component({
  selector: 'page-detalle-pelicula',
  templateUrl: 'detalle-pelicula.html',
})
export class DetallePeliculaPage {
  public detallePelicula;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detallePelicula = this.navParams.get('pelicula');
    console.log('this.detallePelicula', this.detallePelicula);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePeliculaPage');
  }

  public cerrarModal(): void {
    this.navCtrl.pop();
  }
  public abrirLinkImdb(pelicula): void {
    console.log(pelicula);
    let url = 'https://imdb.com/title/' + pelicula.imdbID;
    window.open(url, '_system');
  }
}
