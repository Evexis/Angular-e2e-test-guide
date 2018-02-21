import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'onlyDoctorsFilter'
})

export class DoctorFilter implements PipeTransform {
    transform(value: any, ifMarked: any): any[] {
       if(!ifMarked){
        value = value ? value: null;
        return value ?  value.filter(user => user.role === 'patient')  : value;
       }
       else {
           return value;
       }
    }
}

