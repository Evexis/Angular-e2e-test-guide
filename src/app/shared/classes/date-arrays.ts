export class DateArrays {
    yearsArray = new Array(107);
    nowAndFutureYearsArray = new Array(10);
    daysArray = new Array(31);
    hoursWithMinutesArray = new Array(65);
    hoursArray = new Array(16);
    monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December']
    minutes = [':00', ':15', ':30', ':45'];
    dayOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    date = new Date;

    constructor() {
        this.yearsGenerator();
        this.daysGenerator();
        this.hoursWithMinutesGenerator();
        this.yearsFutureGenerator();
        this.hoursGenerator();
    }

    private yearsGenerator() {
        for (let i = 0; i <= 107; i++) {
            this.yearsArray[i] = 1910 + i;
        }
    }

    private yearsFutureGenerator() {
        for (let i = 0; i <= 10; i++) {
            this.nowAndFutureYearsArray[i] = this.date.getFullYear() + i;
        }
    }

    private daysGenerator() {
        for (let i = 1; i <= 31; i++) {
            this.daysArray[i - 1] = i;
        }
    }

    private hoursWithMinutesGenerator() {
        for (let i = 0, j = 6; j <= 21; j++) {
            this.minutes.forEach(element => this.hoursWithMinutesArray[i++] = (j < 10 ? '0' + j : j) + element);
        }
        this.hoursWithMinutesArray[64] = '22:00';
    }

     hoursGeneratorForSchedule() {
        this.hoursWithMinutesArray = new Array(64);
        for (let i = 0, j = 6; j <= 21; j++) {
            this.minutes.forEach(element => this.hoursWithMinutesArray[i++] = (j < 10 ? '0' + j : j) + element);
        }
    }

    private hoursGenerator() {
        for (let i = 6; i < 22; i++) {
            this.hoursArray[i - 6] = i;
        }

    }



}
