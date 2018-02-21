import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ManageUserComponent } from 'app/shared/manage-user/manage-user.component/manage-user.component';
import { UsersListComponent } from 'app/admin/users-list.component/users-list.component';
import { ScheduleComponent } from 'app/shared/schedule/schedule-component/schedule.component';
import { PatientAppointmentsComponent } from 'app/patient/patient-appointments-component/patient-appointments.component';

const routes: Routes = [
    { path: 'users-list', component: UsersListComponent },
    { path: 'add-user', component: ManageUserComponent },
    { path: 'add-patient', component: ManageUserComponent },
    { path: 'users-list/:id', component: ManageUserComponent },
    { path: 'my-profile', component: ManageUserComponent },
    { path: 'schedule/:id', component: ScheduleComponent },
    { path: 'appointments/:id', component: PatientAppointmentsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
