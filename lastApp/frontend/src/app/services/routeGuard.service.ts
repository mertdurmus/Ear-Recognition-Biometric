import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RouteGuardService  implements CanActivate{

constructor( private authService: AuthService, private router: Router) { }


canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  if (!this.authService.isUserLoggedIn()) {
    this.router.navigate(['main']);
    return false;
  }
  return true;
}

}
