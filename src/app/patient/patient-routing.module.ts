import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DoctorsListComponent } from 'app/patient/doctors-list.component/doctors-list.component';
import { ManageUserComponent } from 'app/shared/manage-user/manage-user.component/manage-user.component';
import { PatientAppointmentsComponent } from 'app/patient/patient-appointments-component/patient-appointments.component';


const routes: Routes = [
    { path: 'new-appointment', component: DoctorsListComponent },
    { path: 'my-profile/:id', component: ManageUserComponent },
    { path: 'my-appointments', component: PatientAppointmentsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientRoutingModule {}
