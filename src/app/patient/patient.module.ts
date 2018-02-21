import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { DoctorsListComponent } from 'app/patient/doctors-list.component/doctors-list.component';
import { PatientRoutingModule } from 'app/patient/patient-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { PatientAppointmentsComponent } from 'app/patient/patient-appointments-component/patient-appointments.component';
import { PatientService } from 'app/patient/patient.service';

@NgModule({
    declarations: [
        DoctorsListComponent,
        PatientAppointmentsComponent
    ],
    imports: [ 
        CommonModule,
        RouterModule,
        FormsModule,
        NgxPaginationModule,
        PatientRoutingModule,
        SharedModule
    ],
    exports: [],
    providers: [ PatientService ],
})
export class PatientModule {}