import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  submitted = false;
  loginerror = '';
  signuperror = '';

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  logIn(username: string, password: string) {
    this.authService.logIn(username, password)
        .subscribe((s: number) => {
      if (s === 200) {
        this.router.navigateByUrl('/');
      } else {
        this.loginerror = 'Incorrect Username or Password';
        this.submitted = false;
      }
    });
  }

  signUp(username: string, password: string, repassword: string) {
    if (password === repassword) {
      this.authService.signUp(username, password)
        .subscribe(s => {
          if (s === 200) {
            this.router.navigateByUrl('/');
          } else {console.log(s);
            this.signuperror = 'User already exists';
            this.submitted = false;
          }
        });
      } else {
        this.signuperror = 'Passwords do not match';
      }
  }

}
