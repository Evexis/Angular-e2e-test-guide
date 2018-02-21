import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from 'app/app.service';
import { AdminService } from 'app/admin/admin.service';
import { AuthService } from 'app/auth/auth.service';
import { ScheduleService } from 'app/shared/schedule/schedule.service';
import { PatientService } from '../../patient/patient.service';

@Component({
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
    errorMessage: any;
    users: any;
    url: string;
    selectedUser: any;
    doctorFilter: string = '';
    onlyDoctors = true;
    onlyPatients = true;
    userRole: string;

    constructor(private appService: AppService, private patientService: PatientService, private adminService: AdminService, private authService: AuthService, private scheduleService: ScheduleService, private router: Router) { }

    ngOnInit(): void {
        this.getUsers();
        this.userRole = this.authService.user.role;
    }

    getUsers() {
        this.appService.getUsers('')
            .subscribe(kroliczki => this.users = kroliczki,
            error => this.errorMessage = <any>error
            );
    }

    onSelect(users: any): void {
        if (users === this.selectedUser) {
            this.selectedUser = null;
        }
        else {
            this.selectedUser = users;
        }
    }

    checkSchedule() {
        if (this.selectedUser.role == "doctor") {
            this.scheduleService.doctorLogin = this.selectedUser.login;
            this.router.navigate(['schedule', this.selectedUser._id]);
        }
        else {
            this.patientService.patientLogin = this.selectedUser.login;
            this.router.navigate(['appointments', this.selectedUser._id]);
        }
    }


    editUser() {
        this.router.navigate(['users-list', this.selectedUser._id/*name.replace(/ /g, '').toLowerCase()*/]);
    }

    deleteUser() {
        this.adminService.deleteUser(this.selectedUser.login)
            .subscribe(() => this.getUsers(),
            error => this.errorMessage = <any>error);
    }


}

