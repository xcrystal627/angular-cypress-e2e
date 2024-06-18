import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard  {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.isAuthenticated()) {
      let currentUser = this.auth.getLoggedInUser();
      if (currentUser.role == 'admin') {
        return true;
      } else {
        this.router.navigateByUrl('/');
        return false;
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
