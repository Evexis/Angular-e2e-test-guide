import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { AppService } from 'app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendar } from '../../classes/calendar';
import { ScheduleService } from 'app/shared/schedule/schedule.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
    days = new Array();
    date = new Date();
    currentDay: any;
    currentMonth: any;
    currentYear: any;
    monthName: any;
    year: any;
    monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December']
    calendar = new Calendar();

    constructor(private router: Router,
        private appService: AppService,
        private route: ActivatedRoute,
        private scheduleService: ScheduleService) {
        this.days = this.calendar.getMonthView();
        this.currentMonth = this.date.getMonth();
        this.currentDay = this.date.getDate();
        this.currentYear = this.date.getFullYear();
        this.setYearAndMonth();
    }

    ngOnInit(){
        this.scheduleService.date.day = this.currentDay;
        this.scheduleService.date.year = this.currentYear;
        this.scheduleService.date.month = this.currentMonth;

        console.log(JSON.stringify(this.scheduleService.date));
    }

    setYearAndMonth() {
        this.monthName = this.monthArray[this.calendar.month];
        this.year = this.calendar.year;
    }

    forward() {
        this.days = this.calendar.moveMonthForward();
        this.setYearAndMonth();
    }
    back() {
        this.days = this.calendar.moveMonthBack();
        this.setYearAndMonth();
    }

    setDaysStyle(day, i) {
        if (day === this.currentDay && this.monthName == this.monthArray[this.currentMonth] && this.currentYear == this.year && !(i < 10 && day > 20) && !(day < 10 && i > 20)) {
            return {
                "color": "white",
                "-webkit-transition": "opacity 0.3s ease-in-out",
                "background-color": "#003d66",
                "border-radius": "50%",
            }
        }
        else if (day === this.scheduleService.date.day && this.monthName == this.monthArray[this.scheduleService.date.month] && this.currentYear == this.scheduleService.date.year  && !(i < 10 && day > 20) && !(day < 10 && i > 20)) {
            return {
                "-webkit-transition": "opacity 0.3s ease-in-out",
                "border": "2px solid #003d66",
                "border-radius": "50%"
            }
        }

        else if ((day < this.currentDay && this.monthName == this.monthArray[this.currentMonth] && this.currentYear == this.year)
            || (day > this.currentDay && i < 6 && this.monthName == this.monthArray[this.currentMonth] && this.currentYear == this.year)
            || (day < this.currentDay && i > 29 && this.monthName == this.monthArray[this.currentMonth] && this.currentYear == this.year)
            || (day > 10 && i < 8)
            || (day < 15 && i > 29)) {
            return {
                "border":"none",
                "color": "#d9d9d9",
                "pointer-events": "none",
                "background-color": "white"
            }
        }
    }

    setDate(year, month, day) {
        this.scheduleService.date.day = day;
        this.scheduleService.date.year = year;
        this.scheduleService.date.month = month;
        this.scheduleService.dataUpdated('date');
        console.log(year, month, day);
    }

}
