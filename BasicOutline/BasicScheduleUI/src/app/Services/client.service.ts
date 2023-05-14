import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { ClientBase } from '../Utility/clientBase';
import { ApiException } from 'src/Models/Exceptions/ApiException';
import { CreateEventDto } from 'src/Models/RequestDtos/CreateEventDto';
import { UpdateEventDto } from 'src/Models/RequestDtos/UpdateEventDto';
import { EventDetailsVM } from 'src/Models/ViewModels/EventDetailsVM';
import { EventListVM } from 'src/Models/ViewModels/EventListVM';
import { EventModel } from 'src/Models/ViewModels/EventModel';
import { OAuthService } from 'angular-oauth2-oidc';
import { C } from '@fullcalendar/core/internal-common';
import { Inject, Injectable } from '@angular/core';

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
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, private readonly oAuthService: OAuthService) {
        this.http = http;
        this.baseUrl = "https://localhost:7001";
        oAuthService.configure(oAuthConfig);
        oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
            oAuthService.tryLoginCodeFlow().then(() => {
                if (!oAuthService.hasValidAccessToken()) {
                    oAuthService.initLoginFlow();
                }
                else {
                    oAuthService.loadUserProfile().then((userProfile) => {
                        console.log(JSON.stringify(userProfile))
                    });
                }
            });
        });
    }

    isLoggedIn(): boolean {
        return this.oAuthService.hasValidAccessToken();
    }

    signOut(): void {
        this.oAuthService.logOut();
    }

    getHeaders(): HttpHeaders {
        return new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + this.oAuthService.getAccessToken(),
        });
    }

    /**
     * @return Success
     */
    get(id: string): Observable<EventDetailsVM> {
        let url_ = this.baseUrl + "/api/Schedule/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            withCredentials: false,
            headers: this.getHeaders()
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<EventDetailsVM>;
                }
            } else
                return _observableThrow(response_) as any as Observable<EventDetailsVM>;
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<EventDetailsVM> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = EventDetailsVM.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<EventDetailsVM>(null as any);
    }

    /**
     * @return Success
     */
    delete(id: string): Observable<string> {
        let url_ = this.baseUrl + "/api/Schedule/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            withCredentials: true,
            headers: this.getHeaders()
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<string>;
                }
            } else
                return _observableThrow(response_) as any as Observable<string>;
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<string> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;

                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<string>(null as any);
    }

    /**
     * @return Success
     */
    getList(from: Date, to: Date): Observable<EventListVM> {
        let url_ = this.baseUrl + "/api/Schedule/{From},{To}";
        if (from === undefined || from === null)
            throw new Error("The parameter 'from' must be defined.");
        url_ = url_.replace("{From}", encodeURIComponent(from ? "" + from.toISOString() : "null"));
        if (to === undefined || to === null)
            throw new Error("The parameter 'to' must be defined.");
        url_ = url_.replace("{To}", encodeURIComponent(to ? "" + to.toISOString() : "null"));
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: this.getHeaders()
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetList(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetList(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<EventListVM>;
                }
            } else
                return _observableThrow(response_) as any as Observable<EventListVM>;
        }));
    }

    protected processGetList(response: HttpResponseBase): Observable<EventListVM> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = EventListVM.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<EventListVM>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    create(body: CreateEventDto | undefined): Observable<EventModel> {
        let url_ = this.baseUrl + "/api/Schedule";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: this.getHeaders()
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<EventModel>;
                }
            } else
                return _observableThrow(response_) as any as Observable<EventModel>;
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<EventModel> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = EventModel.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<EventModel>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    update(body: UpdateEventDto | undefined): Observable<EventModel> {
        let url_ = this.baseUrl + "/api/Schedule";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: this.getHeaders()
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processUpdate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdate(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<EventModel>;
                }
            } else
                return _observableThrow(response_) as any as Observable<EventModel>;
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<EventModel> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = EventModel.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<EventModel>(null as any);
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}