import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { dayMonthCheck } from 'app/shared/manage-user/day-month-check.directives';
import { DateArrays } from '../../classes/date-arrays';


export function formBuilder(fb: FormBuilder, appointmentDetails) {
    const dateArrays= new DateArrays();
    return fb.group({
        login: [appointmentDetails.patient.login, [Validators.required]],
        description: [appointmentDetails.patient.description],
        dayMonthGroup: fb.group({
            month: [dateArrays.monthsArray[appointmentDetails.date.month - 1], [Validators.required]],
            day: [appointmentDetails.date.day, [Validators.required]],
            year: [appointmentDetails.date.year, [Validators.required]]
        }, { validator: dayMonthCheck }),
        hour: [ appointmentDetails.date.hour, [Validators.required]],
    });

}


export function setContent(appointmentForm: FormGroup, appointmentDetails) {
        appointmentForm.get('login').valueChanges.subscribe(value => appointmentDetails.patient.login = appointmentForm.get('login').value);
        appointmentForm.get('description').valueChanges.subscribe(value => appointmentDetails.patient.description = appointmentForm.get('description').value);
        appointmentForm.get('dayMonthGroup.year').valueChanges.subscribe(value => appointmentDetails.date.year = appointmentForm.get('dayMonthGroup.year').value);
        appointmentForm.get('dayMonthGroup.month').valueChanges.subscribe(value => appointmentDetails.date.month = appointmentForm.get('dayMonthGroup.month').value);
        appointmentForm.get('dayMonthGroup.day').valueChanges.subscribe(value => appointmentDetails.date.day = appointmentForm.get('dayMonthGroup.day').value);
        appointmentForm.get('hour').valueChanges.subscribe(value => appointmentDetails.date.hour = appointmentForm.get('hour').value);

}



