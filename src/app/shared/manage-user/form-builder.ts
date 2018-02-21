import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { dayMonthCheck } from 'app/shared/manage-user/day-month-check.directives';


const formContent = [
    'role',
    'firstName',
    'lastName',
    'login',
    'password',
    'age',
    'gender',
    'phone',
    'email',
    'PESEL',
    'specializations'
];

export let specializationsTemp = new Array<FormGroup>();

export function formBuilder(fb: FormBuilder, user:any, action: string) {
    return fb.group({
            role: [user.role],
            firstName: [ user.firstName ? user.firstName : '', [Validators.required]],
            lastName: [ user.lastName ? user.lastName : '', [Validators.required]],
            login: [ user.login ? user.login : '', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            gender: [ user.gender ? user.gender : '', [Validators.required]],
            age: [ user.age ? user.age : '', [Validators.pattern('^[0-9]+$')]],
            phone: [ user.phone ? user.phone : '', [Validators.required]],
            street: [ user.address.street ? user.address.street : ''],
            postcode: [ user.address.postcode ? user.address.postcode : ''],
            city: [ user.address.city ? user.address.city : ''],
            email: [ user.email ? user.email : '', [Validators.required, Validators.pattern('[a-z0-9._A-z%+-]+@[a-z0-9.-]+')]],
            PESEL: [ user.PESEL ? user.PESEL : '', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
            specializations: fb.array(  user.specializations!=undefined ? specializationInit(fb, user) : [buildSpecialization(fb)]),
            workingHours: fb.group({
                monday: fb.group({
                    start: [ user.workingHours!=undefined ?  user.workingHours.monday.start : ''],
                    end: [  user.workingHours!=undefined ?  user.workingHours.monday.end : '' ]
                }),
                tuesday: fb.group({
                    start: [  user.workingHours!=undefined ?  user.workingHours.tuesday.start : '' ],
                    end: [  user.workingHours!=undefined ?  user.workingHours.tuesday.end : '' ]
                }),
                wednesday: fb.group({
                    start: [  user.workingHours!=undefined ?  user.workingHours.wednesday.start : ''],
                    end: [  user.workingHours!=undefined ?  user.workingHours.wednesday.end : '']
                }),
                thursday: fb.group({
                    start: [  user.workingHours!=undefined ?  user.workingHours.thursday.start : ''],
                    end: [  user.workingHours!=undefined ?  user.workingHours.thursday.end : '']
                }),
                friday: fb.group({
                    start: [ user.workingHours!=undefined ?  user.workingHours.friday.start : '' ],
                    end: [ user.workingHours!=undefined ?  user.workingHours.friday.end : '']
                }),
            })
        });

}

export function specializationInit(fb: FormBuilder, user) {
    for (let i = 0; i < user.specializations.length; i++) {
      specializationsTemp[i] = fb.group({ specialization: user.specializations[i].specialization })
    }
    return specializationsTemp;

  }



export function setContent(userForm: FormGroup, user) {
    formContent.forEach(element => {
        if (typeof(element) !== 'object'){
            userForm.get(element).valueChanges.subscribe(value => user[element] = userForm.get(element).value);
        } else {
            const groupName = Object.keys(element)[0]
            element[groupName].forEach(elementNested => userForm.get(groupName + '.' + elementNested).valueChanges.subscribe(value => user[groupName][elementNested] = userForm.get(groupName + '.' + elementNested).value));
        }
    })
         userForm.get('street').valueChanges.subscribe(value => user.address.street = userForm.get('street').value);
         userForm.get('postcode').valueChanges.subscribe(value => user.address.postcode = userForm.get('postcode').value);
         userForm.get('city').valueChanges.subscribe(value => user.address.city = userForm.get('city').value);
         userForm.get('workingHours.monday.start').valueChanges.subscribe(value => user.workingHours.monday.start = userForm.get('workingHours.monday.start').value);
         userForm.get('workingHours.monday.end').valueChanges.subscribe(value => user.workingHours.monday.end = userForm.get('workingHours.monday.end').value);
         userForm.get('workingHours.tuesday.start').valueChanges.subscribe(value => user.workingHours.tuesday.start = userForm.get('workingHours.tuesday.start').value);
         userForm.get('workingHours.tuesday.end').valueChanges.subscribe(value => user.workingHours.tuesday.end = userForm.get('workingHours.tuesday.end').value);
         userForm.get('workingHours.wednesday.start').valueChanges.subscribe(value => user.workingHours.wednesday.start = userForm.get('workingHours.wednesday.start').value);
         userForm.get('workingHours.wednesday.end').valueChanges.subscribe(value => user.workingHours.wednesday.end = userForm.get('workingHours.wednesday.end').value);
         userForm.get('workingHours.thursday.start').valueChanges.subscribe(value => user.workingHours.thursday.start = userForm.get('workingHours.thursday.start').value);
         userForm.get('workingHours.thursday.end').valueChanges.subscribe(value => user.workingHours.thursday.end = userForm.get('workingHours.thursday.end').value);
         userForm.get('workingHours.friday.start').valueChanges.subscribe(value => user.workingHours.friday.start = userForm.get('workingHours.friday.start').value);
         userForm.get('workingHours.friday.end').valueChanges.subscribe(value => user.workingHours.friday.end = userForm.get('workingHours.friday.end').value);  
}


 export function buildSpecialization(fb: FormBuilder): FormGroup {
        return fb.group({
            specialization: '',
        });
    }




