import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()

export class AdminService {
    private _dataBaseUrlDoctorDetails = 'http://localhost:3000/doctor-details';
    private _dataBaseUrlDeleteDoctor = 'http://localhost:3000/delete-user';
    private _dataBaseUrlPatientDetails = 'http://localhost:3000/patient-details';

    constructor (private _http: Http) {}

    // updateDoctor(param): Observable<string> {
    //     return this._http.put(this._dataBaseUrlDoctorDetails, param)
    //         .map((response: Response) => response.json())
    //         .do(data => console.log('All: ' + JSON.stringify(data)))
    //         .catch(this.handlerError);
    // }

    deleteUser(param): Observable<string> {
        return this._http.delete(this._dataBaseUrlDeleteDoctor + '/' + param)
            .map((response: Response) => response.json())
        .do(data => console.log('Deleted: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    findPatient(param): Observable<string> {
        return this._http.post(this._dataBaseUrlPatientDetails, param)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    private handlerError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
