export class Calendar {
    private monthView = new Array<number>(42);
    private monthsDaysQuantity = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    private date;
    private today;
    year;
    month;
    private day;
    private firstDay;

    constructor() {
        this.setDays();

    }

    private feebruaryValidator(): void {
        if ((this.date.getFullYear() % 100 === 0) ? this.date.getFullYear() % 400 === 0 : this.date.getFullYear() % 4 === 0) {
            this.monthsDaysQuantity[1] = 29;
        }
    }

    private monthViewLoop(param = this.month): void {
        for (let i = 0, j = 1, k = 1; i < 42; i++ , this.firstDay--) {
            if (this.firstDay >= 0) {
                this.monthView[i] = this.monthsDaysQuantity[param] - this.firstDay;
            } else if (this.firstDay < 0 && j <= this.monthsDaysQuantity[this.month]) {
                this.monthView[i] = j++;
            } else {
                this.monthView[i] = k++;
            }
        }
    }

    setDays(): void {
        this.date = new Date();
        this.today = (this.date.getDay() === 0) ? 6 : (this.date.getDay() - 1);
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate() % 7;
        this.feebruaryValidator();
        this.firstDay = this.today - this.day;
        this.firstDay = this.firstDay > 0 ? this.firstDay : this.firstDay + 7;
        this.monthViewLoop();
    }

    moveMonthForward(): Array<number> {
        if (this.month === 11) {
            this.year++;
            this.month = 0;
        } else {
            this.month++;
        }
        this.date = new Date(this.year, this.month, 1);
        this.firstDay = (this.date.getDay() === 0) ? 5 : (this.date.getDay() - 1) - 1;
        this.feebruaryValidator();

        this.monthViewLoop(this.month === 0 ? 11 : this.month - 1);

        return this.monthView;
    }

    moveMonthBack(): Array<number> {
        if (this.month === 0) {
            this.year--;
            this.month = 11;
        } else {
            this.month--;
        }
        this.date = new Date(this.year, this.month, 1);
        this.firstDay = (this.date.getDay() === 0) ? 5 : (this.date.getDay() - 1) - 1;
        this.feebruaryValidator();

        this.monthViewLoop(this.month === 0 ? 11 : this.month - 1);
        return this.monthView;
    }

    getMonthView(): Array<number> {
        return this.monthView;
    }
}