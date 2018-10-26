import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { User } from '../user-model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.check()
      .then((result: boolean) => {
        if (!result) {
          this.router.navigateByUrl('/authenticate');
        }
        return result;
      });
  }
}

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(): Promise<boolean> {
    return this.authService.check()
      .then((result: boolean) => {
        if (result) {
          this.router.navigateByUrl('/');
        }
        return !result;
      });
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(): Promise<boolean> {
    return this.authService.getUser()
    .then((user: User) => {
      if (!user) {
        this.router.navigateByUrl('/authenticate');
      } else if (user.username !== 'admin') {
        this.router.navigateByUrl('/');
      }
      return user && user.username === 'admin';
    });
  }
}
