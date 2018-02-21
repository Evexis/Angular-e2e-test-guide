import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
// import { AppRoutingModule } from 'app/app-routing.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from 'app/admin/admin.module';
import { SharedModule } from 'app/shared/shared.module';
import { PatientModule } from 'app/patient/patient.module';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        AuthModule,
        AdminModule,
        PatientModule,
        SharedModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: '**', redirectTo: 'login', pathMatch: 'full' }
        ]),
    ],
    exports: [],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule { }