import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()

export class AppService {
    private _dataBaseUrlUserDetails = 'http://localhost:3000/user-details';
    url: string;
    constructor(private _http: Http) {
        this.url = "";
    }

    getUsers(param?): Observable<string> {
        return this._http.get(param ? this._dataBaseUrlUserDetails + '/' + param : this._dataBaseUrlUserDetails)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    getUserDetails(param): Observable<string> {
        return this._http.post(this._dataBaseUrlUserDetails, param)
            .map((response: Response) => response.json())
            .do(data => console.log('User passed: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    updateUser(user, param?): Observable<string> {
        return this._http.put(param ? this._dataBaseUrlUserDetails + '/' + param : this._dataBaseUrlUserDetails, user)
            .map((response: Response) => response.json())
            .do(data => console.log("Users details changed:" + JSON.stringify(user)))
            .catch(this.handlerError);
    }

    private handlerError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
