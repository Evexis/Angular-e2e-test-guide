import { AbstractControl } from '@angular/forms';
import { DateArrays } from '../classes/date-arrays';

export function dayMonthCheck(c: AbstractControl): { [key: string]: boolean } | null {
    const month = c.get('month');
    const day = c.get('day');
    const year = c.get('year');
    const dateArrays = new DateArrays();

    if (month.value === 'February' && (day.value < 29 || (day.value == 29 && ((year.value % 100 === 0) ? (year.value % 400 === 0) : (year.value % 4 === 0))))) {
        return null;
    } else if (day.value < 31 && (month.value === dateArrays.monthsArray[3] ||
        month.value === dateArrays.monthsArray[5] ||
        month.value === dateArrays.monthsArray[8] ||
        month.value === dateArrays.monthsArray[10])) {
        return null;

    } else if (day.value <= 31 && (month.value === dateArrays.monthsArray[0] ||
        month.value === dateArrays.monthsArray[2] ||
        month.value === dateArrays.monthsArray[4] ||
        month.value === dateArrays.monthsArray[6] ||
        month.value === dateArrays.monthsArray[7] ||
        month.value === dateArrays.monthsArray[9] ||
        month.value === dateArrays.monthsArray[11])) {
        return null;
    } else {
        return { 'error': true };
    }
}
