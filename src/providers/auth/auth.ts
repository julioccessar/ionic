import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

 /* public login(username: string, password: string): Promise<any> {
    let promesa = new Promise((resolve, reject) => {
      if (!username || !password) {
        reject('Faltan datos');
      }
    });
    return promesa;
  }*/

  public loginObservable(username: string, password: string, userStore): Observable<any> {
    let observable = new Observable((observer) => {
      console.log(userStore);
      // si no existe username o password.
      if (!username || !password) {
        observer.error('Faltan datos');
      }
      else if (username == userStore.username && password === userStore.password) {
        setTimeout(() => {
          observer.next(true);
          observer.complete();
        }, 750);
      }
      else {
        setTimeout(() => {
          observer.error('Nombre de usuario o contraseña incorrecta');
        }, 750);
      }
    });

    return observable;
  }
}