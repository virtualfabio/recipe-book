import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

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
    user = new Subject<User>();

    constructor(private http: HttpClient){

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

}