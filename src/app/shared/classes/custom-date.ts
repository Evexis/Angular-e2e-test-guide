export class CustomDate {
    private _day: number;
    private _month: number;
    private _year: number;

    constructor(date: Date) {
        this._day = date.getDate();
        this._month = date.getMonth();
        this._year = date.getFullYear();
    }

    set day(day) {
        this._day = day;
    }

    set month(month) {
        this._month = month;
    }
    
    set year(year) {
        this._year = year;
    }

    get day() {
        return this._day;
    }

    get month() {
        return this._month;
    }

    get year() {
        return this._year;
    }

}

