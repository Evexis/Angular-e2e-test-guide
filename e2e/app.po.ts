import { browser, element, by } from 'protractor';
import * as request from 'request';

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
    element.all(by.css('input')).get(0).sendKeys(login);
    element.all(by.css('input')).get(1).sendKeys(password);
    element(by.css('button')).click();
  }

  logout() {
    element(by.cssContainingText('a', 'LOG OUT')).click();
  }

  goToRegistragionPage() {
    element(by.cssContainingText('a', 'Sign up')).click();
  }

  fillRegistrationForm() {
    /*
    * it needs to be cleared. Without clearing all, in first name and last name inputs we see "NG_DEFER_BOOTSTRAP!NG_DEFER_BOOTSTRAP!tester"
    * why is it not work corectly? Because of form builder? maybe? idk
    */
    for (let i = 0; i < 11; i++) {
      element.all(by.css('input')).get(i).clear();
    }

    // As i said in login method comentary, the same problem is here - unclear, hard coding
    element.all(by.css('input')).get(0).sendKeys('tester');
    element.all(by.css('input')).get(1).sendKeys('tester123');
    element.all(by.css('input')).get(2).sendKeys("tester");
    element.all(by.css('input')).get(3).sendKeys('tester');
    element(by.cssContainingText('option', 'female')).click();
    element.all(by.css('input')).get(4).sendKeys('25');
    element.all(by.css('input')).get(5).sendKeys('111222333');
    element.all(by.css('input')).get(6).sendKeys('tester@tester.tester');
    element.all(by.css('input')).get(7).sendKeys('tester street');
    element.all(by.css('input')).get(8).sendKeys('11-111');
    element.all(by.css('input')).get(9).sendKeys("tester city");
    element.all(by.css('input')).get(10).sendKeys('12345678901'); //missing PESEL validation in application
    element(by.css('button')).click();
  }

  makeVisit() {
    element(by.cssContainingText('a', 'CHECK SCHEDULE')).click()
    element.all(by.css('.arrow')).get(1).click();
    element.all(by.cssContainingText('button', '15')).get(0).click();
    element(by.cssContainingText('button', '20:15')).click();
    element(by.css('input')).sendKeys('tester');
    element(by.css('textarea')).sendKeys('test visit');
    element(by.cssContainingText('button', 'save')).click();
  }

  async checkIsVisitPresent() {
    element(by.cssContainingText('a', 'MY APPTS')).click();
    element(by.cssContainingText('button', 'passed appointments')).click();
    element(by.cssContainingText('button', 'comming appointments')).click();
    let isTrue = false;
    element.all(by.css('.appointment-list')).each(async (appointment) => {
      console.log(await appointment.getText())
      if(await appointment.getText() == '20:15 dr Brooke Winchester internista') isTrue=true;
    });
    return isTrue
  }
}
