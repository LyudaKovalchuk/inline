import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from "@angular/http";
import { Subject, Observable } from 'rxjs';

import api from '../api';
import { Credentials, AuthResponse, User } from '../../interfaces';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {

  private _isAuth: Subject<boolean> = new Subject<boolean>();
  public isAuth: Observable<boolean> = this._isAuth.asObservable();

  constructor(private httpClient: HttpClient, private userService: UserService) {
    this.httpClient.get<AuthResponse>(api.auth.isAuth)
      .subscribe((res: AuthResponse) => this._isAuth.next(res.isAuth));
  }

  login(credentials: Credentials) {
    return this.httpClient.post<User>(api.auth.login, credentials)
      .do((res: User) => this.userService.updateUserState(res));
  }

  logout() {
    return this.httpClient.delete<AuthResponse>(api.auth.logout)
      .do((res: AuthResponse) => this._isAuth.next(res.isAuth));
  }

}
