import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { map, shareReplay, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MarkerService {

    constructor(private http: HttpClient) { }

    getRouteValue(imei): Observable<any> {
        return this.http.get("http://iswm-stage.acceldash.com/api/v1/livegps_data/" + imei);
    }

}
