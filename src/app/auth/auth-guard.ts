import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { map, tap, take } from 'rxjs/operators';
import { isUndefined } from 'util';

@Injectable({ providedIn : 'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router){
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean{
        console.log('AuthGuard...');
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth =  !!user;
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
        );
        /*
        return this.authService.isAuthenticated()
        .then((authenticated: boolean) =>{
            if (authenticated){
                return true;
            }else{
                this.router.navigate(['/']);
            }
        });
        */
    }

}