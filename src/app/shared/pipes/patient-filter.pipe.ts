import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'onlyPatientsFilter'
})

export class PatientFilter implements PipeTransform {
    transform(value: any, ifMarked: any): any[] {
       if(!ifMarked){
        value = value ? value: null;
        return value ?  value.filter(user => user.role === 'doctor')  : value;
       }
       else {
           return value;
       }
    }
}

