import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';

import 'rxjs/add/operator/toPromise';

import { AppService } from 'app/app.service';
import { Calendar } from '../../classes/calendar';
import { dayMonthCheck } from '../../manage-user/day-month-check.directives';
import { DateArrays } from '../../classes/date-arrays';
import { ScheduleService } from 'app/shared/schedule/schedule.service';
import { Appointment } from 'app/shared/classes/appointment';
import { formBuilder, setContent } from './form-builder';
import { AuthService } from 'app/auth/auth.service';

@Component({
    selector: 'app-appontment-details',
    templateUrl: 'appointment-details.component.html',
    styleUrls: ['appointment-details.component.css']
})

export class AppointmentDetailsComponent implements OnInit, OnDestroy {
    appointmentForm: FormGroup;
    yearsArray = new Array(107);
    daysArray = new Array(31);
    invalid = false;
    invalidMessage = "";
    errMessage: any;
    genders = ['male', 'female'];
    dateArrays = new DateArrays;
    canView = false;
    selectedAppointmentTmp = new Appointment();
    editAppointment = new Appointment();

    constructor(private fb: FormBuilder, private appService: AppService, private scheduleService: ScheduleService, private authService: AuthService, private route: ActivatedRoute) {
        this.appointmentForm = formBuilder(this.fb, this.scheduleService.selectedAppointment);
        this.scheduleService.subscribe((param) => this.hourChange(param));
    }

    ngOnInit() {
        this.dateArrays.hoursGeneratorForSchedule();
    }

    hourChange(updatedItem): void {
        if (updatedItem == "hour") {
            this.appService.getUserDetails({ login: this.scheduleService.selectedAppointment.patient.login })
                .toPromise()
                .then(patient => this.scheduleService.patient = patient)
                .then(() => this.appointmentForm = formBuilder(this.fb, this.scheduleService.selectedAppointment))
                .then(() => {
                    _.merge(this.editAppointment, this.scheduleService.selectedAppointment)
                })
                .then(() => setContent(this.appointmentForm, this.editAppointment))
                .then(() => {
                    if (this.scheduleService.patient[0] != undefined || this.authService.user.role == "patient") {
                        this.deleteLoginValidation();
                    }
                })
                .then(() => this.canView = true)
        }
    }

    checkIfTermIsValid() {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const d = new Date(
            this.appointmentForm.get('dayMonthGroup.year').value,
            (this.dateArrays.monthsArray.indexOf(this.appointmentForm.get('dayMonthGroup.month').value)),
            this.appointmentForm.get('dayMonthGroup.day').value);

        try {
            const app = this.scheduleService.allAppointments.find(element => element.login == this.scheduleService.doctor[0].login &&
                element.date.year == d.getFullYear() &&
                element.date.month == d.getMonth() + 1 &&
                element.date.day == d.getDate() &&
                element.date.hour == this.appointmentForm.get('hour').value);
            console.log(app);

            if (this.scheduleService.doctor[0].workingHours[days[d.getDay()]].start > this.appointmentForm.get('hour').value ||
                this.scheduleService.doctor[0].workingHours[days[d.getDay()]].end < this.appointmentForm.get('hour').value) {
                return true;
            }
            else if (app) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    deleteLoginValidation(): void {
        const login = this.appointmentForm.get('login');
        login.clearValidators();
        login.updateValueAndValidity();
    }

    deleteAppt() {
        this.scheduleService.deleteAppt(this.editAppointment._id)
            .subscribe(() => this.scheduleService.getVisits(),
            error => this.errMessage = <any>error);
    }

    insertLoginToEditAppointmentVariable() {
        this.editAppointment.patient.login = this.authService.user.login;
    }

    onSubmit() {
        this.invalid = false;
        if ((this.dateArrays.monthsArray[this.dateArrays.date.getMonth()] == this.appointmentForm.get('dayMonthGroup.month').value
            && this.dateArrays.date.getDate() > this.appointmentForm.get('dayMonthGroup.day').value
            && this.dateArrays.date.getFullYear() == this.appointmentForm.get('dayMonthGroup.year').value)

            || ((this.dateArrays.date.getMonth() + 1) > (this.dateArrays.monthsArray.indexOf(this.appointmentForm.get('dayMonthGroup.month').value) + 1) && this.dateArrays.date.getFullYear() == this.appointmentForm.get('dayMonthGroup.year').value)) {
            this.invalidMessage = "Choosen date passed";
            this.invalid = true;
        }
        else if (this.checkIfTermIsValid()) {
            this.invalidMessage = "Doctor is not working in choosen hour or hour is taken";
            this.invalid = true;
        }
        else if (this.authService.user.role == "patient") {
            this.insertLoginToEditAppointmentVariable();
            this.scheduleService.insertAppt(this.editAppointment).subscribe(() => this.scheduleService.getVisits());

        }
        else {
            if (this.scheduleService.patient[0] != undefined) {
                this.scheduleService.updateVisit(this.editAppointment).subscribe(() => this.scheduleService.getVisits());
            }

            else {
                this.scheduleService.insertAppt(this.editAppointment).subscribe(result => {
                    if (result === 'OK') {
                        this.scheduleService.getVisits();
                    }
                    else {
                        this.invalid = true;
                        this.invalidMessage = "Patient does not exist";
                    }

                });
            }
        }

    }

    ngOnDestroy(): void {
        this.scheduleService.unsubscribe(this.hourChange);
    }
}
