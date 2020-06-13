import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GetUserFormat } from '../models/getUserFormat';
import { EarService } from '../services/ear.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService]
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private earService: EarService) { }
  email: string;
  userFormat: GetUserFormat;
  hasUserSecret;
  secretKey;

  ngOnInit() {
    this.email = this.authService.getAuthenticatedUser();
    console.log(this.email);
    this.authService.getUserInfo(this.email).subscribe(
      data => {
        this.userFormat = data as GetUserFormat ;
        console.log(this.userFormat);
        console.log(data);
        this.hasUserSecret = true;
      }
    );

  }

  getSecretKey() {
    this.earService.getSecretKey('5').subscribe(data => {
      this.secretKey = data;
      console.log(data);
    }
  );
  }

}
