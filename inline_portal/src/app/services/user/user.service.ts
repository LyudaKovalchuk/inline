import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from "@angular/http";
import { Subject, Observable } from 'rxjs';

import api from '../api';
import { User } from '../../interfaces';

@Injectable()
export class UserService {

  private _user: Subject<User> = new Subject<User>();
  public user: Observable<User> = this._user.asObservable();

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<User>(api.user.current)
      .subscribe((user) => this._user.next(user));
  }

  createUser(user: User) {
    return this.httpClient.post<User>(api.user.self, user)
      .do((user) => this._user.next(user));
  }

  updateUserState(user: User) {
    this._user.next(user);
  }

}
