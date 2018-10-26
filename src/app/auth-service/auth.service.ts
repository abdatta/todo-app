import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../user-model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: Promise<User>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUser = this.http.get<User>('/api/accounts/auth')
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
    return this.http.post<User>('/api/accounts/login', { username: user, password: pass})
      .pipe(
        map((response: User) => {
          this.currentUser = Promise.resolve(response);
          return 200;
        }),
        catchError(this.handleError)
      );
  }

  signUp(user: string, pass: string): Observable<number> {
    return this.http.post<User>('/api/accounts/signup', { username: user, password: pass })
      .pipe(
        map((response: User) => {
          this.currentUser = Promise.resolve(response);
          return 200;
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {console.log('logging out...');
    this.currentUser = Promise.resolve(null);
    // To execute observable, it is converted to a promise
    this.http.post('/api/accounts/logout', {})
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(o => this.router.navigateByUrl('/authenticate'));
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
