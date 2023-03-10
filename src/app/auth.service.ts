import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  AuthService {

  private loginApi = 'http://14.160.91.174:1387/api/v1/auth/admin';
  readonly TOKEN_NAME = 'auth';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(!!this.token)
  }

  login(email: string, password: string) {
    return this.http.post(this.loginApi, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem(this.TOKEN_NAME, response.token);
        localStorage.setItem('name', response.user.name);
        this._isLoggedIn$.next(true);
      })
    )
  }

}
