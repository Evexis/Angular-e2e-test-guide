import { browser, element, by } from 'protractor';
import * as request from 'request';


/*
* Here we build some objects as page elements map
*/
const loginPageElements = {
  loginInput: element.all(by.css('input')).get(0),
  passwordInput: element.all(by.css('input')).get(1),
  loginButton: element(by.css('button')),
  signUp: element(by.cssContainingText('a', 'Sign up'))
}

const registrationPageElements = {
  loginInput: element.all(by.css('input')).get(0),
  passwordInput: element.all(by.css('input')).get(1),
  firstNameInput: element.all(by.css('input')).get(2),
  lastNameInput: element.all(by.css('input')).get(3),
  ageInput: element.all(by.css('input')).get(4),
  phoneInput: element.all(by.css('input')).get(5),
  emailInput: element.all(by.css('input')).get(6),
  streetInput: element.all(by.css('input')).get(7),
  postcodeInput: element.all(by.css('input')).get(8),
  cityInput: element.all(by.css('input')).get(9),
  peselInput: element.all(by.css('input')).get(10),
  genderSelect:{
    male: element.all(by.cssContainingText('option', 'male')).get(0),
    female: element(by.cssContainingText('option', 'female'))
  },
  submitButton: element(by.css('button'))
  
}

const doctorPageElements = {
  navbar: {
    checkScheduleButton: element(by.cssContainingText('a', 'CHECK SCHEDULE')),
    usersListButton: element(by.cssContainingText('a', "USER'S LIST")),
    addPatientButton: element(by.cssContainingText('a', 'ADD PATIENT')),
    myProfileButton: element(by.cssContainingText('a', 'MY PROFILE')),
    logoutButton: element(by.cssContainingText('a', 'LOG OUT'))
  },
  schedule: {
    previousMonth: element.all(by.css('.arrow')).get(0),
    nextMonth: element.all(by.css('.arrow')).get(1),
    dayButton: (day: number) => element.all(by.cssContainingText('button', `${day}`)).get(0),
    hourButton: (hour: string) => element(by.cssContainingText('button', hour)),
    patientNameInput: element(by.css('input')),
    visitDescription: element(by.css('textarea')),
    makeVisitButton: element(by.cssContainingText('button', 'save'))
  }
}

const patientPageElements = {
  navbar: {
    myApptsButton: element(by.cssContainingText('a', "MY APPTS")),
    newApptsButton: element(by.cssContainingText('a', 'NEW APPTS')),
    myProfileButton: element(by.cssContainingText('a', 'MY PROFILE')),
    logoutButton: element(by.cssContainingText('a', 'LOG OUT'))
  },
  myAppts: {
    passedAppointmentsButton: element(by.cssContainingText('button', 'passed appointments')),
    commingAppointmentsButton: element(by.cssContainingText('button', 'comming appointments')),
    appointmentsArray: element.all(by.css('.appointment-list')),   
  }
}

export class DoktorkiPage {

  navigateTo() {
    return browser.get('http://localhost:4200');
  }

  databaseSetup() {
    request('http://localhost:3000/init-db');
  }

  login(login, password) {
    /*
    * We choose all input of page and fill it with login and password
    * Who knows that login input is the first and password input is the second ?
    * The code below is unlear, uses "magic numbers". This is a hard coding.
    */
    loginPageElements.loginInput.sendKeys(login);
    loginPageElements.passwordInput.sendKeys(password);
    loginPageElements.loginButton.click();
  }

  logout() {
    doctorPageElements.navbar.logoutButton.click();
  }

  fillRegistrationForm() {
    loginPageElements.signUp.click();
    /*
    * it needs to be cleared. Without clearing all, in first name and last name inputs we see "NG_DEFER_BOOTSTRAP!NG_DEFER_BOOTSTRAP!tester"
    * why is it not work corectly? Because of form builder? maybe? idk
    */
    for (let i = 0; i < 11; i++) {
      element.all(by.css('input')).get(i).clear();
    }

    // As i said in login method comentary, the same problem is here - unclear, hard coding
    registrationPageElements.loginInput.sendKeys('tester');
    registrationPageElements.passwordInput.sendKeys('tester123');
    registrationPageElements.firstNameInput.sendKeys("tester");
    registrationPageElements.lastNameInput.sendKeys('tester');
    registrationPageElements.genderSelect.female.click();
    registrationPageElements.ageInput.sendKeys('25');
    registrationPageElements.phoneInput.sendKeys('111222333');
    registrationPageElements.emailInput.sendKeys('tester@tester.tester');
    registrationPageElements.streetInput.sendKeys('tester street');
    registrationPageElements.postcodeInput.sendKeys('11-111');
    registrationPageElements.cityInput.sendKeys("tester city");
    registrationPageElements.peselInput.sendKeys('12345678901'); //missing PESEL validation in application
    registrationPageElements.submitButton.click();
  }

  makeVisit() {
    doctorPageElements.navbar.checkScheduleButton.click()
    doctorPageElements.schedule.nextMonth.click();
    doctorPageElements.schedule.dayButton(15).click();
    doctorPageElements.schedule.hourButton('20:15').click();
    doctorPageElements.schedule.patientNameInput.sendKeys('tester');
    doctorPageElements.schedule.visitDescription.sendKeys('test visit');
    doctorPageElements.schedule.makeVisitButton.click();
  }

  async checkIsVisitPresent() {
    patientPageElements.navbar.myApptsButton.click();
    patientPageElements.myAppts.passedAppointmentsButton.click();
    patientPageElements.myAppts.commingAppointmentsButton.click();
    let isTrue = false;
    browser.sleep(2000)
    patientPageElements.myAppts.appointmentsArray.each(async (appointment) => {
      console.log(await appointment.getText())
      if(await appointment.getText() == '20:15 dr Brooke Winchester internista') isTrue=true;
    });
    return isTrue
  }
}
