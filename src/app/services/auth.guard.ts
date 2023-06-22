import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable ({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    // tslint:disable-next-line: variable-name
    constructor(private _authservice: AuthService, private route: Router, private router: ActivatedRoute) {}
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot)
    : boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this._authservice.user.pipe(take(1), map(user => {
            const isAuth = !!user;
            const expectedRole = route.data.expectedRole;
            const userDataAgent = JSON.parse(localStorage.getItem('userDataAgent'));

            if (isAuth && router.url === '/') {
                this._authservice.logout();
                return true;
            } else if (isAuth && (expectedRole === userDataAgent.roleId)){
                return true;
            } else if (!isAuth && router.url === '/') {
                return true;
            }
            this._authservice.logout();
            return this.route.createUrlTree(['/']);
        }));
    }
}
