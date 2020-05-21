import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertifyService } from './services/alertify.service';

import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { RouteGuardService } from './services/routeGuard.service';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProfileComponent,
    MainComponent,
    PhotoUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule 
  ],
  providers: [AlertifyService, RouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }