import { Pipe, PipeTransform } from '@angular/core';

@Pipe(
    {
        name: 'cityFilter',
        pure: false
    })

export class CityFilter implements PipeTransform {
    transform(value: any, cityArrayBoolean: any, cities): any {
        let filteredNames = new Array();
        filteredNames = this.citiesFilter(cityArrayBoolean, cities);

        return filteredNames ?
            value.filter((user: any) => {
                return filteredNames.find(element => element === user.address.city);

            }
            ) : value;

    }


    citiesFilter(cityArrayBoolean, cities) {
        let result = new Array();

        for (let i = 0; i < cityArrayBoolean.length; i++) {
            if (cityArrayBoolean[i]) {
                result.push(cities[i]);
                
            }
        }
        return result;
    }

}