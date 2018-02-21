import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
    url: string;

    constructor(private appService: AppService) { }
    
    ngOnInit() {
        setTimeout(() => this.url = this.appService.url , 0);
    }

}


