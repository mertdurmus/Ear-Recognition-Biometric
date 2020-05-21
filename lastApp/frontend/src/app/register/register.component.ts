import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from '../models/registerUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }


  registerForm: FormGroup;
  registerUser: RegisterUser;

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        tc: ['', Validators.required],
        password: ['', Validators.required],
      }
    );
  }


  ngOnInit() {
    this.createRegisterForm();
  }

  register() {
    if (this.registerForm.valid) {
      this.registerUser = Object.assign({}, this.registerForm.value);
      this.authService.register(this.registerUser).subscribe(
        data => {

          setTimeout(() => { this.router.navigateByUrl('/'); }, 3000);
        },
        error => console.log(error));
      setTimeout(() => { this.router.navigateByUrl('/register'); }, 3000);
    } else {
      console.log('error');
      setTimeout(() => { this.router.navigateByUrl('/register'); }, 3000);
    }
  }
}
