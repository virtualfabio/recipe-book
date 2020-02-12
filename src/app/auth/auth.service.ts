import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router){

    }

    signup(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAT26M_GvxxBOQBPmDO_z_16uqmmOxn-ZM', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData =>{
           this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    autoLogin(){
        console.log('autoLogin');
        const userData: {
            email: string, id: string, _token: string, _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        console.log(userData);
        if(!userData){
            return;
        }
        const loadedUser =  new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAT26M_GvxxBOQBPmDO_z_16uqmmOxn-ZM', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData =>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
        const exirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user =  new User(email, userId, token, exirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse){
        console.log(errorRes);
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorRes);
        }
        switch (errorRes.error.error.message) {
            case 'INVALID_PASSWORD':
                errorMessage = 'This email/password is not correct!';   
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email/password is not correct!';   
                break;   
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already!';  
                break;
        }
        return throwError(errorMessage);

    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearInterval(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
}