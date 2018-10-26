import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../user-model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: Promise<User>;

  constructor(private http: HttpClient) {
    this.currentUser = this.http.get<User>('/server/accounts/auth')
      .pipe(
        catchError((err: any, caught) => of(null))
      ).toPromise();
  }

  getUser = (): Promise<User> => this.currentUser;

  check(): Promise<boolean> {
    return this.currentUser.then((user: User) => {
      return user != null;
    });
  }

  logIn(user: string, pass: string): Observable<number> {
    return this.http.post<User>('/server/accounts/signin', { username: user, password: pass})
      .pipe(
        map((response: User) => {
          this.currentUser = Promise.resolve(response);
        }),
        catchError(this.handleError)
      );
  }

  signUp(name: string, user: string, pass: string): Observable<number> {
    return this.http.post<User>('/server/accounts/signup', { name: name, username: user, password: pass })
      .pipe(
        map((response: User) => {
          this.currentUser = Promise.resolve(response);
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.currentUser = Promise.resolve(null);
    // To execute observable, it is converted to a promise
    this.http.post('/server/accounts/logout', {})
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: any): Observable<any> {
    if (error.status === 401) {
      this.currentUser = Promise.resolve(null);
    }
    if (error.status) {
      return of(error.status);
    }
    return Observable.throw(error.message || error);
  }
}
