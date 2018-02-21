import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

import { MenuComponent } from 'app/shared/menu/menu.component/menu.component';
import { ManageUserComponent } from 'app/shared/manage-user/manage-user.component/manage-user.component';
import { NameFilterPipe } from 'app/shared/pipes/name-filter.pipe';
import { DoctorFilter } from 'app/shared/pipes/doctor-filter.pipe';
import { PatientFilter } from 'app/shared/pipes/patient-filter.pipe';
import { CalendarComponent } from 'app/shared/schedule/calendar/calendar.component';
import { ScheduleComponent } from 'app/shared/schedule/schedule-component/schedule.component';
import { ScheduleService } from 'app/shared/schedule/schedule.service';
import { AgendaComponent } from 'app/shared/schedule/agenda/agenda.component';
import { AppointmentDetailsComponent } from 'app/shared/schedule/appointment-details/appointment-details.component';
import { CityFilter } from 'app/shared/pipes/city-filter.pipe';
import { SpecFilter } from 'app/shared/pipes/spec-filter.pipe';

@NgModule({
    declarations: [
        MenuComponent,
        ManageUserComponent,
        NameFilterPipe,
        DoctorFilter,
        PatientFilter,
        CityFilter,
        SpecFilter,
        ScheduleComponent,
        CalendarComponent,
        AgendaComponent,
        AppointmentDetailsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
     ],
    exports: [
        MenuComponent,
        ManageUserComponent,
        NameFilterPipe,
        DoctorFilter,
        PatientFilter,
        CityFilter,
        SpecFilter,
        CalendarComponent,
        ScheduleComponent,
        AgendaComponent,
        AppointmentDetailsComponent
    ],
    providers: [ ScheduleService ],
})
export class SharedModule {}
