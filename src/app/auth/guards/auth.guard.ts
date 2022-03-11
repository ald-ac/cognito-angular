import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //Get current user, if exists login
      return Auth.currentAuthenticatedUser().then(user => {
        if (user) {
          return true;
        } else {
          //Redirect to auth component
          this.router.navigate(['./auth/login']);
          return false;
        }
      }).catch(error => {
        //Redirect to auth component
        this.router.navigate(['./auth/login']);
        return false;
      });
  
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      //Get current user, if exists login
      return Auth.currentAuthenticatedUser().then(user => {
        if (user) {
          return true;
        } else {
          //Redirect to auth component
          this.router.navigate(['./auth/login']);
          return false;
        }
      }).catch(error => {
        //Redirect to auth component
        this.router.navigate(['./auth/login']);
        return false;
      });
    
  } 
}
