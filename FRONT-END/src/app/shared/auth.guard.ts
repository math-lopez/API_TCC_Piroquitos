import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  subscription: Subscription[] = [];

  constructor(private authService: AuthService, private route: Router){
    this.subscription.push(
      this.authService.isAuth.subscribe(resp => {this.isAtuh = resp}),
      this.authService.usuario.subscribe(resp => this.usuario = resp)
    )
  }
  usuario: User;
  isAtuh: boolean;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.isAtuh)
        return this.isAtuh;
      else
        this.route.navigate(['']);
      return this.isAtuh
  }
  
}
