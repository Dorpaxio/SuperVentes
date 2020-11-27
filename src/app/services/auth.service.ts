import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import Membre from '../models/Membre';
import * as moment from 'moment';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiEndpoint = environment.endpoint + '/membres';

  private currentUserSubject: BehaviorSubject<Membre>;
  public currentUser: Observable<Membre>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Membre>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get user(): Membre {
    return this.currentUserSubject.value;
  }

  set user(user: Membre) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn.replace('w', ''), 'week');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    this.user = authResult.user;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  connexion(body: { email: string, password: string }): Observable<any> {
    return this.http.post<{ ok: boolean, user: Membre, token: string, expiresIn: string }>
    (this.apiEndpoint + '/connexion', body)
      .pipe(
        tap(data => this.setSession(data)),
        map(data => data.user)
      );
  }

  register(body: { email: string, password: string, nom: string, prenom: string }): Observable<any> {
    return this.http.post(this.apiEndpoint + '/inscription', body).pipe(
      tap(this.setSession),
      map(data => data.user)
    );
  }
}
