import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'specFilter'})
export class SpecFilter implements PipeTransform {
    transform(value: any, filterBy: string): any {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ?
        value.filter((filtered: any) => {
            const specialization = this.objectToString(filtered.specializations);
        return (specialization.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }) : value;
}


    objectToString(array) {
        let result: string ;
        array.forEach(object => {
            result += object.specialization + ' ';
        });
        return result;
    }
}
