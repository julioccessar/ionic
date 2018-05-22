import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PeliculasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeliculasProvider {
  private nombrePelicula: any;

  constructor(public http: HttpClient) {
    this.nombrePelicula = 'Texto uno.';
    console.log('Hello PeliculasProvider Provider');
  }

  public test(): any {
    return 'Texto de prueba';
  }

  public setNombrePelicula(nombre: string): void {
    this.nombrePelicula = nombre;
  }

  public getNombrePelicula(): string {
    return this.nombrePelicula;
  }

  public buscarPelicula(nombre: string): Promise<any> {
    let url = 'http://www.omdbapi.com/?apikey=cf36c0f0&s=' + nombre;
    return this.http.get(url).toPromise();
  }
  public buscarPeliculaById(id: string): Promise<any> {
    let url = 'http://www.omdbapi.com/?apikey=cf36c0f0&i=' + id;
    return this.http.get(url).toPromise();
  }

}
