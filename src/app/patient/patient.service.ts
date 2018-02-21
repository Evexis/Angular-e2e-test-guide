import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { AuthService } from 'app/auth/auth.service';

@Injectable()
export class PatientService {
    patientLogin = this.authService.user.login;
    constructor(private _http: Http, private authService: AuthService) {
    }

    getVisits(param, params?): Observable<Array<any>> {
        return this._http.post(params ? this._dataBaseUrlSchedule + '/' + params : this._dataBaseUrlSchedule, param)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    private handlerError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private _dataBaseUrlSchedule = 'http://localhost:3000/schedule';

}