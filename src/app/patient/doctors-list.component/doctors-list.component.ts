import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';

import { NameFilterPipe } from '../../shared/pipes/name-filter.pipe';
import { ScheduleService } from 'app/shared/schedule/schedule.service';

@Component({
    templateUrl: './doctor-list.component.html',
    styleUrls: ['./doctor-list.component.css']
})

export class DoctorsListComponent implements OnInit {
  errorMessage: any;
  doctors: any;
  selectedDoctor: any;
  doctorFilter: string = '';
  specFilter: string = '';
  can=false;
  cityFilter = new Array<boolean>();
  cities = new Array<string>();
  citiesList=false;

  constructor(private appService: AppService, private scheduleService: ScheduleService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers()
      .then(() => this.getCities())
      .then(() => this.can=true)
  }

  private getCities() {
    this.doctors.forEach(doctor => {
      let cityExistance = false;
      try {
        this.cities.forEach(city => {
          if (city === doctor.address.city) {
            cityExistance = true;
            throw cityExistance;
          }
        });
      } catch (error) {}
      if (!cityExistance) {
        this.cities.push(doctor.address.city);
        this.cityFilter.push(true);
      }
    });
    console.log(this.cities);
  }


  getUsers() {
    return this.appService.getUsers('doctor')
      .toPromise().then(kroliczki => this.doctors = kroliczki,
      error => this.errorMessage = <any>error
      );
  }


  activeCitiesList(){
      this.citiesList=!this.citiesList;
  }

  onSelect(doctor: any): void {
    if (doctor === this.selectedDoctor) {
      this.selectedDoctor = null;
    }
    else {
      this.selectedDoctor = doctor;
        }
  }

  checkSchedule() {
      this.scheduleService.doctorLogin=this.selectedDoctor.login;
      this.router.navigate(['schedule/' + this.selectedDoctor._id], { queryParams: { 'refresh': 1 } });
  
  }

}