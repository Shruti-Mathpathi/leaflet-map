import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs'
import { tap, map, shareReplay, catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class PolylineService {

    constructor(private http: HttpClient) { }

    getRouteValue(imei: string, date: string, pageNo: number): Observable<any> {
        return this.http.get("http://iswm-stage.acceldash.com/api/v1/gps_log_page/" + imei + "/" + date + "/1?perPage=600&page=" + pageNo);
    }

}
