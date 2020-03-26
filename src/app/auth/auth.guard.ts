import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromRoot from '../app.reducer';

@Injectable( { providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, 
        private store : Store<fromRoot.State>,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean{
        // if (this.authService.isAuth()) {
        //     console.log('isAuth training')
        //     return true;
        //   } else {
        //     this.router.navigate(['/login']);
        //     return false;
        //   }

        return this.store.select(fromRoot.getIsAuth);
    }
}
