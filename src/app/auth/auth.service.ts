import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { User } from 'app/shared/classes/user';



@Injectable()

export class AuthService {
    private _dataBaseUrlLogin = 'http://localhost:3000/login';
    private _dataBaseUrlAddUser = 'http://localhost:3000/insert-user';
    user: User;
    constructor (private _http: Http) {}

    authenticate(message: any): Observable<string> {
        return this._http.post(this._dataBaseUrlLogin, message)
            .map((response: Response) => response.json())
            .do(data => {
                this.user = data;
                console.log('Authenticate results: ' + JSON.stringify(this.user));
            })
            .catch(this.handlerError);
    }

    addUser(message: any, param): Observable<string> {
        return this._http.post(this._dataBaseUrlAddUser + '/' + param, message)
            .map((response: Response) => response.json())
            .do(data => console.log('Authenticate results: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    private handlerError(error: Response) {
       console.error(error);
       return Observable.throw(error.json().error || 'Server error');
    }


}

