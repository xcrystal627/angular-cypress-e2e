import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticatedSubject = new ReplaySubject<boolean>(0);
  public isAuthenticatedCheck = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  populate(): any {
    const user = localStorage.getItem('user');
    if (user && user !== 'null') {
      this.isAuthenticatedSubject.next(true);
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  getUsers() {
    return this.http.get(environment.api_url + '/login');
  }

  login(data) {
    localStorage.setItem('user', JSON.stringify(data));
    this.isAuthenticatedSubject.next(true);

    // console.log(data);

    let url = data.role == 'admin' ? '/dashboard' : '/user';
    // console.log(url);

    this.router.navigateByUrl(url);
  }

  logOut() {
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this.router.navigateByUrl('/login');
  }

  updateUser(params: { id: string | number }, body) {
    return this.http.put(
      environment.api_url + '/login/' + params.id,
      body
    );
  }

  updateExam(body) {
    return this.http.put(environment.api_url + '/exams/update/' + body.id, body);
  }

  getLoggedInUser() {
    let userdata = localStorage.getItem('user');
    if (userdata) {
      return JSON.parse(userdata);
    } else {
      return null;
    }
  }

  isAuthenticated() {
    let userdata = localStorage.getItem('user');
    return !!userdata;
  }

  getExams() {
    return this.http.get(environment.api_url + '/exams');
  }
}
