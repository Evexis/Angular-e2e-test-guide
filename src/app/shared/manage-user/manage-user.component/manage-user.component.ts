import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { UserDetails } from 'app/shared/classes/user';
import { DateArrays } from 'app/shared/classes/date-arrays';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'app/app.service';
import { dayMonthCheck } from 'app/shared/manage-user/day-month-check.directives';
import { formBuilder, setContent, buildSpecialization, specializationInit } from 'app/shared/manage-user/form-builder';
import { AuthService } from 'app/auth/auth.service';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './manage-user.component.html',
    styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
    @Input() admin: boolean;
    invalid = false;
    errMessage: any;
    userForm: FormGroup;
    user: any;
    url: any;
    genders = ['male', 'female'];
    dateArrays = new DateArrays();
    userLogin: string;
    userEdit: any;
    canView = false;
    get specializations(): FormArray {
        return <FormArray>this.userForm.get('specializations');
    }

    constructor(private appService: AppService, private authService: AuthService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
        this.user = new UserDetails('', '', '', '', '', undefined, undefined, undefined, '', '', '', '', '');
        this.userForm = formBuilder(this.fb, this.user, 'add');
    }


    private setURL(): Promise<boolean> {
        this.url = this.route.snapshot.url.join('/');
        this.appService.url = this.url;
        this.userLogin = this.route.snapshot.params['id'];

        return new Promise(resolve => resolve(true));
    }

    ngOnInit() {
        this.setURL()
            .then(async () => {
                if (this.userLogin != undefined) {
                    await this.appService.getUserDetails({ _id: this.userLogin })
                        .toPromise()
                        .then(user => this.user = user)
                }
                return new Promise(resolve => resolve(true));
            })
            .then(() => {
                if (this.userLogin == undefined) {
                    this.setRole();
                }
                this.canView = true;
                return new Promise(resolve => resolve(true));
            })
            .then(() => {
                if (this.user[0] != undefined) {
                    this.userForm = formBuilder(this.fb, this.user[0], 'edit');
                }
            })
            .then(() => {
                setContent(this.userForm, this.user[0] != undefined ? this.user[0] : this.user);
                if (this.authService.user == undefined || this.authService.user.role == "doctor") {
                    this.user.role = "patient";
                }
                if (this.userLogin != undefined) {
                    this.deletePasswordValidation();
                }
            });
    }

    addSpecialization(): void {
        this.specializations.push(buildSpecialization(this.fb));
    }

    deleteSpecialization(specialization): void {
        const control = <FormArray>this.userForm.controls['specializations'];
        control.removeAt(specialization);
    }


    detectRoleChange() {
        this.userForm.get('role').valueChanges.subscribe(value => this.setRole());
    }

    async setRole() {
        if (this.user.role == "doctor") {
            this.user.workingHours = {
                monday: {},
                tuesday: {},
                wednesday: {},
                thursday: {},
                friday: {}
            };
            this.user.specializations = [];
        }
        else if (this.user.role == "patient") {
            await Promise.all([
                () => delete this.user.workingHours.monday,
                () => delete this.user.workingHours.tuesday,
                () => delete this.user.workingHours.wednesday,
                () => delete this.user.workingHours.thursday,
                () => delete this.user.workingHours.friday,
            ]);
            await delete this.user.workingHours;
            await delete this.user.specializations;
        }
    }

    deletePasswordValidation(): void {
        const password = this.userForm.get('password');
        const login = this.userForm.get('login');

        password.clearValidators();
        password.updateValueAndValidity();

        login.clearValidators();
        login.updateValueAndValidity();
    }

    onSubmit() {
        if (this.userLogin == undefined) {
            this.authService.addUser(this.user, this.user.role)
                .subscribe((result) => {
                    if (result === 'OK') {
                        {
                            if (this.authService.user != undefined) {
                                if (this.authService.user.role != "patient") {
                                    this.router.navigate(['users-list']);
                                }
                            }
                            else {
                                this.router.navigate(['login']);
                            }
                        }
                    }

                    else {
                        this.invalid = true;
                        window.scrollTo(0, 0);
                    }
                }
                , err => this.errMessage = err);
        }
        else {
            this.appService.updateUser(this.user[0], this.user[0].role)
                .subscribe((result) => {
                    if (this.authService.user.role == "patient") {
                        this.router.navigate(['new-appointment'])
                    }
                    else {
                        this.router.navigate(['users-list']);
                    }
                    err => this.errMessage = err
                });
        }
    }

}
