import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { RouteGuardService } from './services/routeGuard.service';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { CaptureImageComponent } from './capture-image/capture-image.component';

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'photoUpload', component: PhotoUploadComponent},
  {path: 'takePhoto', component: CaptureImageComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [RouteGuardService]},
  {path: '', redirectTo: 'main', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
