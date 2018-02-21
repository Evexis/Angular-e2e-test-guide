import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

import { AppService } from 'app/app.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})

export class MenuComponent implements OnInit {
    url: string;
    menuContext = new Array();
    menuLinks = new Array();
    userLogin: string;

    constructor(private appService: AppService, private authService: AuthService, private router: Router) {
    }

    ngOnInit() {

        try {
            if (this.authService.user.role == "admin") {
                this.menuContext = [" ", " ", "USER'S LIST", "ADD USER", "LOG OUT"]
                this.menuLinks = [" ", " ", "/users-list", "/add-user", "/login"]
            }
            else if (this.authService.user.role == "doctor") {
                this.menuContext = [" ", "CHECK SCHEDULE", "USER'S LIST", "ADD PATIENT", "MY PROFILE", "LOG OUT"]
                this.menuLinks = [" ", "/schedule/" + this.authService.user._id, "/users-list/", "/add-patient", "/users-list/" + this.authService.user._id, "/login"]
            }
            else if (this.authService.user.role == "patient") {
                this.menuContext = [" ", " ", "MY APPTS", "NEW APPT", "MY PROFILE", "LOG OUT"]
                this.menuLinks = [" ", " ", "/my-appointments", "/new-appointment", "/my-profile/" + this.authService.user._id, "/login"]
            }
        }
        catch (err) {
            this.router.navigate(['login']);
        }
      }

    setLogo(i) {
        if (i == 0) {
            return {
                "background-image": "url('../../../../assets/doktorki.png')",
                "background-repeat": "no-repeat"
            }
        }
     }


}