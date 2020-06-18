import { Component, OnInit } from '@angular/core';
import { AuthService, AUTHENTICATED_USER_TC } from '../services/auth.service';
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
  hasUserSecret2: boolean;
  secretKey;

  ngOnInit() {
    this.email = this.authService.getAuthenticatedUser();
    console.log(this.email);
    this.authService.getUserInfo(this.email).subscribe(
      data => {
        this.userFormat = data as GetUserFormat ;
        console.log(this.userFormat);
        console.log(data);
        sessionStorage.setItem(AUTHENTICATED_USER_TC, this.userFormat.tc);
        setTimeout(() => {}, 100);
        this.authService.hasUserKey().subscribe(dd => {
          this.hasUserSecret = dd['control'];
          console.log(this.hasUserSecret);
          if(this.hasUserSecret  === true){
            this.hasUserSecret2 = true;
            console.log(this.hasUserSecret2);
          }
          else {
            this.hasUserSecret2 = false;
            console.log(this.hasUserSecret2);
          }
        });
      }
    );

  }

  getSecretKey() {
    const x = Math.floor(Math.random() * 6) + 1;
    this.earService.getSecretKey(x.toString()).subscribe(data => {
      this.secretKey = data;
      console.log(data);
    }
  );
  }

}
