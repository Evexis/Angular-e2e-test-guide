import { browser, element, by } from 'protractor';

export class DoktorkiPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.cssContainingText('label', 'login')).getText();
  }
}
