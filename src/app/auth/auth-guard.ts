import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map, take } from 'rxjs/operators';


@Injectable({ providedIn : 'root'})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<fromApp.AppState>, private router: Router){
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean{
        console.log('AuthGuard...');
        return this.store.select('auth').pipe(
            take(1),
            map(authState =>{
                return authState.user;
            }),
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