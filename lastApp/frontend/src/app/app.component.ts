import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoginUser } from './models/loginUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {

  constructor(private authService: AuthService) { }

  loginUser: LoginUser = new LoginUser();


  login() {
    this.authService.login(this.loginUser);

  }

  logOut() {
    this.authService.logOut();
  }

  get isAuthenticated() {
    return this.authService.isUserLoggedIn();
  }



}
