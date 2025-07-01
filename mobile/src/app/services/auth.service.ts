import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    this.checkAuthStatus();
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData).pipe(
      tap((response: any) => {
        this.handleAuthResponse(response);
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        this.handleAuthResponse(response);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}).pipe(
      tap(() => {
        this.clearAuth();
      })
    );
  }

  private async handleAuthResponse(response: any): Promise<void> {
    await this.storage.set(this.tokenKey, response.access_token);
    this.userSubject.next(response.user);
  }

  private async clearAuth(): Promise<void> {
    await this.storage.remove(this.tokenKey);
    this.userSubject.next(null);
  }

  async getToken(): Promise<string | null> {
    return await this.storage.get(this.tokenKey);
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  private async checkAuthStatus(): Promise<void> {
    const token = await this.getToken();
    if (token) {
      this.http.get(`${this.apiUrl}/auth/user`).subscribe({
        next: (user: any) => this.userSubject.next(user),
        error: () => this.clearAuth()
      });
    }
  }
}
