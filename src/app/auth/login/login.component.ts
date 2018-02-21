import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { AuthService } from 'app/auth/auth.service';
import { AppService } from 'app/app.service';
import { User } from "app/shared/classes/user";


@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
})


export class LoginComponent implements OnInit {

    loginInput: string;
    passwordInput: string;
    admin = 'admin';
    resMessage: any;
    invalid: boolean;
    loginForm: FormGroup;
    url: string;

    constructor(private appService: AppService, 
                private authService: AuthService, 
                private router: Router, 
                private fb: FormBuilder, 
                private route: ActivatedRoute)
    { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.loginForm.get('login').valueChanges.subscribe(() => this.loginInput = this.loginForm.get('login').value);
        this.loginForm.get('password').valueChanges.subscribe(() => this.passwordInput = this.loginForm.get('password').value);
        
        this.url= this.route.snapshot.url.join('');
        this.appService.url = this.url;
}

    check(): Promise<string> {
        return this.authService.authenticate({
            login: this.loginInput,
            password: this.passwordInput
        }).toPromise();
    }

    redirectAfterLogin(): void {
        if (this.resMessage.role === 'admin') {
            this.router.navigate(['/users-list']);
        }
        else if (this.resMessage.role === 'doctor') {
            this.router.navigate(['/users-list']);
        }
        else if (this.resMessage.role === 'patient') {
            this.router.navigate(['/new-appointment']);
        }
        else {
            this.invalid = true;
        }
    }

    onSubmit(): void {
        this.check()
            .then(res => this.resMessage = res)
            .then(() => this.redirectAfterLogin());
    }

    // setUrl(){
    //     this.url= 'register'
    //     this.appService.url = this.url;
    // }


}

