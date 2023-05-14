import { Inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { mergeMap as _observableMergeMap, catchError as _observableCatch, catchError } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

const oAuthConfig = {
  issuer: 'https://localhost:7000',
  redirectUri: window.location.origin,
  clientId: 'AngularBasicUI',
  scope: 'openid profile ScheduleWebApi',
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'https://localhost:7001/api/Schedule';
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.oAuthService.getAccessToken()
    })
  };
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(private readonly httpClient: HttpClient,
    private readonly oAuthService: OAuthService) {
    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.oAuthService.tryLoginCodeFlow().then(() => {
        if (!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow();
        }
        else {
          this.oAuthService.loadUserProfile().then((userProfile) => {
            console.log(JSON.stringify(userProfile))
          });
        }
      });
    });
  }


  getEventDetails(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get(url, this.options).pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  deleteEvent(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url, this.options).pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  getEventList(from: Date, to: Date): Observable<any> {
    const url = `${this.baseUrl}/2023-05-14T00%3A00%3A09.557Z,2023-05-14T22%3A00%3A09.557Z`;
    return this.httpClient.get(url, this.options).pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  createEvent(eventData: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, eventData, this.options).pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  updateEvent(eventData: any): Observable<any> {
    return this.httpClient.put(this.baseUrl, eventData, this.options).pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }


  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut(): void {
    this.oAuthService.logOut();
  }

}
