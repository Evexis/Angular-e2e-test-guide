import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { AppService } from 'app/app.service';
import { Appointment } from 'app/shared/classes/appointment';
import { PatientService } from 'app/patient/patient.service';
import { AuthService } from "app/auth/auth.service";

@Component({
    templateUrl: 'patient-appointments.component.html',
    styleUrls: ['patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements OnInit {
    // passedAppts = new Array<Appointment>();
    // commingAppts = new Array<Appointment>();
    canView = false;
    commingButton = true;
    passedButton = false;

    passedAppts = new Array<CommingAndPassedAppointments>();
    commingAppts = new Array<CommingAndPassedAppointments>();

    constructor(private appService: AppService, private patientService: PatientService, private authService: AuthService) {
    }

    ngOnInit() {
        this.patientService.getVisits({ "patient.login": this.patientService.patientLogin }, '0').toPromise()
            .then(appointments => {
                const now = JSON.stringify(new Date()).replace(/-|:|T/gi, '').substring(1, 9) + (new Date()).getHours() + (new Date()).getMinutes();
                appointments.forEach(async (element) => {

                    if (this.stringifyDate(element) > now) {
                        this.commingAppts.push(element);
                        await this.appService.getUserDetails({ login: element.login })
                            .toPromise().then((doctor: any) => {
                                this.commingAppts[this.commingAppts.indexOf(element)].name = doctor[0].firstName + " " + doctor[0].lastName;
                                this.commingAppts[this.commingAppts.indexOf(element)].spec = '';
                                for (let i = 0; i < doctor[0].specializations.length; i++)
                                    this.commingAppts[this.commingAppts.indexOf(element)].spec += doctor[0].specializations[i].specialization +  " ";
                            })
                    }
                    else {
                        this.passedAppts.push(element);
                        await this.appService.getUserDetails({ login: element.login })
                            .toPromise().then((doctor: any) => {
                                this.passedAppts[this.passedAppts.indexOf(element)].name = doctor[0].firstName + " " + doctor[0].lastName;
                                this.passedAppts[this.passedAppts.indexOf(element)].spec = '';
                                for (let i = 0; i < doctor[0].specializations.length; i++)
                                    this.passedAppts[this.passedAppts.indexOf(element)].spec += doctor[0].specializations[i].specialization +  " ";
                            });

                    }
                });
            })
            .then(() => {
                this.commingAppts.sort((a, b) => this.stringifyDate(a) - this.stringifyDate(b));
                this.passedAppts.sort((a, b) => this.stringifyDate(b) - this.stringifyDate(a));
            })
            .then(() => this.canView = true);
    }

    setPassedAppts() {
        this.passedButton = true;
        this.commingButton = false;
    }

    setCommingAppts() {
        this.passedButton = false;
        this.commingButton = true;
    }

    setButtonsStyle(param) {
        return {
            "background-color": this.passedButton && param == "passed" ? "#004d80" : (this.commingButton && param == "comming" ? "#004d80" : "white"),
            "color": this.passedButton && param == "passed" ? "white" : (this.commingButton && param == "comming" ? "white" : "#004d80")
        }
    }

    private stringifyDate(appt) {
        const rtn = appt.date.year.toString() +
            (appt.date.month > 9 ? appt.date.month : '0' + appt.date.month) +
            (appt.date.day > 9 ? appt.date.day : '0' + appt.date.day) +
            appt.date.hour;
        return rtn.replace(':', '');
    }

}

export class CommingAndPassedAppointments extends Appointment {
    spec = " ";
    name = " ";

    // constructor



}
