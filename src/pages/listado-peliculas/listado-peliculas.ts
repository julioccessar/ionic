import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { PeliculasProvider } from '../../providers/peliculas/peliculas';


//import { HomePage } from '../home/home';

/**
 * Generated class for the ListadoPeliculasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'listado-peliculas'
})
@Component({
  selector: 'page-listado-peliculas',
  templateUrl: 'listado-peliculas.html',
})
export class ListadoPeliculasPage {
  public listadoPeliculas;
  public arrayPeliculas: any[];
  private localStorage: Storage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public peliculasProvider: PeliculasProvider,
    private modalCtrl: ModalController,
  ) {
    console.log('Constructor');
    this.arrayPeliculas = [];
    this.localStorage = window.localStorage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoPeliculasPage');
    this.listadoPeliculas = this.navParams.get('peliculasLista');

    if (!this.listadoPeliculas) {
      this.listadoPeliculas = { "Search": [{ "Title": "The Avengers", "Year": "2012", "imdbID": "tt0848228", "Type": "movie", "Poster": "https://ia.media-imdb.com/images/M/MV5BMTk2NTI1MTU4N15BMl5BanBnXkFtZTcwODg0OTY0Nw@@._V1_SX300.jpg" }, { "Title": "Avengers: Age of Ultron", "Year": "2015", "imdbID": "tt2395427", "Type": "movie", "Poster": "https://ia.media-imdb.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg" }, { "Title": "Avengers: Infinity War", "Year": "2018", "imdbID": "tt4154756", "Type": "movie", "Poster": "https://ia.media-imdb.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg" }, { "Title": "The Avengers", "Year": "1998", "imdbID": "tt0118661", "Type": "movie", "Poster": "https://ia.media-imdb.com/images/M/MV5BYWE1NTdjOWQtYTQ2Ny00Nzc5LWExYzMtNmRlOThmOTE2N2I4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg" }, { "Title": "The Avengers: Earth's Mightiest Heroes", "Year": "2010–2012", "imdbID": "tt1626038", "Type": "series", "Poster": "https://ia.media-imdb.com/images/M/MV5BYzA4ZjVhYzctZmI0NC00ZmIxLWFmYTgtOGIxMDYxODhmMGQ2XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg" }, { "Title": "Ultimate Avengers", "Year": "2006", "imdbID": "tt0491703", "Type": "movie", "Poster": "https://ia.media-imdb.com/images/M/MV5BMjY0Mzg1NDAtZmVmNC00NDIyLTk4YjEtYzU4ZTU2ZTZkMDc0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg" }, { "Title": "Ultimate Avengers II", "Year": "2006", "imdbID": "tt0803093", "Type": "movie", "Poster": "https://ia.media-imdb.com/images/M/MV5BZjI3MTI5ZTYtZmNmNy00OGZmLTlhNWMtNjZiYmYzNDhlOGRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg" }, { "Title": "The Avengers", "Year": "1961–1969", "imdbID": "tt0054518", "Type": "series", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNjkwMzMzOTQxMF5BMl5BanBnXkFtZTcwNjQzMzIzMQ@@._V1_SX300.jpg" }, { "Title": "Avengers Assemble", "Year": "2013–", "imdbID": "tt2455546", "Type": "series", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY0NTUyMDQwOV5BMl5BanBnXkFtZTgwNjAwMTA0MDE@._V1_SX300.jpg" }, { "Title": "Next Avengers: Heroes of Tomorrow", "Year": "2008", "imdbID": "tt1259998", "Type": "movie", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ3NjExNjY4N15BMl5BanBnXkFtZTcwNTczODkwNQ@@._V1_SX300.jpg" }], "totalResults": "91", "Response": "True" };
    }

    this.arrayPeliculas = this.listadoPeliculas.Search;
  }

  public goDetallePelicula(pelicula: any): void {
    let modal = this.modalCtrl.create('detalle-pelicula', { pelicula });
    modal.present();
    modal.onDidDismiss((data) => {
      console.log('Modal se cierra');
    });
  }



  public sharePelicula(pelicula): void {
    console.log('sharePelicula', pelicula);
  }
  public addToFavourite(pelicula): void {
    /*console.log('addToFavourite', pelicula);
    let favourites = this.localStorage.getItem('favourite');
    this.localStorage.setItem('favourite',
      favourites + ";" + JSON.stringify(pelicula)
    );*/

    let favourites = this.localStorage.getItem('favourite');
    console.log(favourites);
    if (favourites) {
      let arr = favourites.split(";");
      
      let res = arr.filter(element => element !== "null").filter(element =>
        JSON.parse(element).imdbID == pelicula.imdbID
      );
      let set = [];
      if (res.length > 0) {// del
        set = arr.filter(element => element !== "null").filter(element =>
          JSON.parse(element).imdbID != pelicula.imdbID
        );

        this.localStorage.removeItem("favourite");
        set.forEach(element => {
          let favourites = this.localStorage.getItem('favourite');
          this.localStorage.setItem('favourite',
            favourites + ";" + element
          );
        });
      } else {//add
        this.localStorage.setItem('favourite',
          favourites + ";" + JSON.stringify(pelicula)
        );
      }

    } else {
      this.localStorage.setItem('favourite',
        JSON.stringify(pelicula)
      );
    }

  }
  public buyTicket(pelicula): void {
    console.log('buyTicket', pelicula);
  }


}
