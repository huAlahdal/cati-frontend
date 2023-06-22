import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { baseUrl } from '../helpers/baseUrl';
import { Router } from '@angular/router';

export interface AuthResponseData {
  name:	string;
  email:	string;
  mobile:	string;
  roleId:	number;
  token:	string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = baseUrl + '/api';
  private TokenexpiteTimer: any;
  user = new BehaviorSubject<User>(null);

constructor(private http: HttpClient, private router: Router) { }


  agentLogin(userDataAgent: {mobile: string, password: string}) {
    return this.http.post<AuthResponseData>
    ( baseUrl + '/api/users/loginagent', userDataAgent).pipe(tap( resData => {
      this.handleAuth(resData.name, resData.email, resData.mobile, resData.roleId, resData.token);
    }));
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userDataAgent');
    localStorage.removeItem('project');
    if (this.TokenexpiteTimer) {
      clearTimeout(this.TokenexpiteTimer);
    }
    this.TokenexpiteTimer = null;
    this.router.navigate(['/']);
  }

  autoLogin() {
     const userDataAgent: {
        name: string;
        email: string;
        mobile: string;
        roleId: number;
        token: string;
       } = JSON.parse(localStorage.getItem('userDataAgent') || '{}');
     if (!userDataAgent) {
      return;
    }
     const loadUser = new User(userDataAgent.name, userDataAgent.email, userDataAgent.mobile, userDataAgent.roleId, userDataAgent.token);
     if (loadUser._token) {
      this.user.next(loadUser);
    }
  }

  public getToken(): string {
    if (localStorage.getItem('userDataAgent')) {
      const userDataAgent = JSON.parse(localStorage.getItem('userDataAgent'));
      return (userDataAgent) ? userDataAgent.token : null;
    }
    return null;
  }

  public getRole(): number {
    if (localStorage.getItem('userDataAgent')) {
      const userDataAgent: User = JSON.parse(localStorage.getItem('userDataAgent'));
      return (userDataAgent.roleId) ? userDataAgent.roleId : null;
    }
    return null;
  }

  private handleAuth(name: string, email: string, mobile: string, roleId: number, token: string) {
    const user = new User(name, email, mobile, roleId, token);
    this.user.next(user);
    localStorage.setItem('userDataAgent', JSON.stringify(user));
  }
}
