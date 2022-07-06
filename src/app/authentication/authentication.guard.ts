import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
      private authentificationService: AuthenticationService,
      private router: Router){
  }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
          
          const currentUser = this.authentificationService.currentUserValue

          if(currentUser){
              return true;
          }
          else {
              this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
              return false;
          }
  }
  
}
