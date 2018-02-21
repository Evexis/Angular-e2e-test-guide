import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'firstlastNameFilter'
})

export class NameFilterPipe implements PipeTransform {
    transform(value: any, filterBy: string): any[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ?
            value.filter((filtered: any) => {
                const firstLastName = filtered.firstName + ' ' + filtered.lastName;
                const lastFirstName = filtered.lastName + ' ' + filtered.firstName;
            return (firstLastName.toLocaleLowerCase().indexOf(filterBy) !== -1 || lastFirstName.toLocaleLowerCase().indexOf(filterBy) !== -1);

            }) : value;

    }
}


