import { Injectable } from '@angular/core';
import { CustomDate } from '../classes/custom-date';
import { Appointment } from '../classes/appointment';
import * as _ from 'lodash';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { AuthService } from 'app/auth/auth.service';

@Injectable()

export class ScheduleService {
    private _dataBaseUrlSchedule = 'http://localhost:3000/schedule';
    private _dataBaseUrlInsertAppt = 'http://localhost:3000/insert-appt';
    private _dataBaseUrlDeleteAppt = 'http://localhost:3000/delete-appt/';

    doctorLogin;
    doctor;
    patient;

    // array of all appointments
    allAppointments;
    // arrays of appointments of selected day and of hours of that appts
    dailyAppointments;
    dailyAppointmentsHours;
    // single appointment which we selected and selected day of week
    selectedAppointment = new Appointment();
    selectedDayOfWeek;

    date = new CustomDate(new Date());

    constructor(private _http: Http, private authService: AuthService) { }

    private _getVisits(param, params?): Observable<string> {
        return this._http.post(params ? this._dataBaseUrlSchedule + '/' + params : this._dataBaseUrlSchedule, param)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    updateVisit(param): Observable<string> {
        return this._http.put(this._dataBaseUrlSchedule + '/' + '0', param)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    insertAppt(param): Observable<string> {
        return this._http.post(this._dataBaseUrlInsertAppt, param)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }


    deleteAppt(param): Observable<string> {
        return this._http.delete(this._dataBaseUrlDeleteAppt + param)
            .map((response: Response) => response.json())
            .do(data => console.log('Deleted: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    private handlerError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


    getVisits (): Promise<any> {
        return this._getVisits({login: this.authService.user.role=="doctor" ? this.authService.user.login :this.doctorLogin}, '0').toPromise()
        .then(appointments => this.allAppointments = appointments)
        .then(() => this.getAllApptsAndThenDailyAppts());
    }

    apptsToArray(data) {
        let array = new Array();
        for (let i = 0; i < data.length; i++) {
            array[i] = data[i].date.hour;
        }
        return array;
    }

    getDailyAppts() {
        let array = new Array();
        for (let i = 0; i < this.allAppointments.length; i++) {
            if (_.isEqual(this.allAppointments[i].date, {
                year: this.date.year,
                month: (this.date.month + 1),
                day: this.date.day,
                hour: this.allAppointments[i].date.hour // ojej!
            })) {
                array.push(this.allAppointments[i]);
            }
        }
        return new Promise(resolve => resolve(array));
    }

    getAllApptsAndThenDailyAppts() {
        this.getDailyAppts()
            .then(result => this.dailyAppointments = result)
            .then(() => this.selectedDayOfWeek = this.getdayOfWeek())
            .then(() => this.dailyAppointmentsHours = this.apptsToArray(this.dailyAppointments))
    }

    getdayOfWeek() {
        let date = new Date(this.date.year, this.date.month, this.date.day);
        return date.getDay();
    }

    dataUpdated(param) {
        this.subscribers.forEach(s => s(param));
    }

    subscribe(fn: (string) => void) {
        this.subscribers.push(fn);
    }

    unsubscribe(fn) {
        const idx = this.subscribers.indexOf(fn);
        this.subscribers.splice(idx, 1);
    }

    private subscribers: Array<(string) => void> = [];
}
