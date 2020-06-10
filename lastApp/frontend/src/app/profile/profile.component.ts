import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GetUserFormat } from '../models/getUserFormat';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService]
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }
  email: string;
  userFormat: GetUserFormat;
  hasUserSecret;

  ngOnInit() {
    this.email = this.authService.getAuthenticatedUser();
    console.log(this.email);
    this.authService.getUserInfo(this.email).subscribe(
      data => {
        this.userFormat = data as GetUserFormat ;
        console.log(this.userFormat);
        console.log(data);
        this.hasUserSecret = false;
      }
    );

  }


}
