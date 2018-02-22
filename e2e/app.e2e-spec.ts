import { DoktorkiPage } from './app.po';
import { browser } from 'protractor';

describe('doktorki App', function() {
  let page: DoktorkiPage;
  browser.driver.manage().window().maximize(); 
  /*
  * beforeAll method is called once before all tests (WOW :O)
  * In this project we drop current database and insert testing data
  */
  beforeAll(() => {
    page = new DoktorkiPage();
    page.databaseSetup();
  })

  /*
  * berofeEach method is called before each test (the second WOW :O)
  * Before each test application needs to create new "fresh" page obcject
  * We also navigate to localhost:4200 here
  */
  beforeEach(() => {
    page = new DoktorkiPage();
    page.navigateTo();
    
  });

  /* 
  * Each 'it' method is separate test. The method has two parameters:
  * The first is name of current test (string)
  * The second is callback with all of test instructions - callback could be async is use 'lib: [es2015, dom]' in tsconfig.json in e2e folder
  * 
  * Protractor adapts Jasmine so that each spec automatically waits until the control flow is empty before exiting.
  * Jasmine expectations are also adapted to understand promises. 
  * That's why below line works - the code actually adds an expectation task to the control flow, which will run after the other tasks:
  * 
  *   expect(0).toBe(0); 
  * 
  * toBe and toEqual matchers behaviours are the same for primitives value (string, number, boolean)
  * But for objects toBe matcher will fail because it based on '==='operator and this expectation
  * 
  *   expect(a).toBe(b)
  * 
  * is equivalent of 
  * 
  *   expect(a === b).toBe(true)
  * 
  * so when we want to compere object we should use toEqual Jasmine matcher
  * 
  *   const a = ['1']
  *   const b = ['1']
  *   expect(a).toEqual(b) //will pass
  * 
  * https://github.com/jasmine/jasmine/blob/master/src/core/matchers/toBe.js <-- toBe Jasmine matcher source code
  */ 

  it('expectation with toEqual matcher will PASS', () => {
    const a = ['1']
    const b = ['1']
    expect(a).toEqual(b) //will pass
  });

  it('expectation with toEqual matcher will FAIL', () => {
    const a = ['1']
    const b = ['1']
    expect(a).toBe(b) //will fail
  });

  it('admin login', () => {
    page.login('admin', 'admin')
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/users-list');
  });

  it('registration', () => {
    page.goToRegistragionPage();
    page.fillRegistrationForm();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/login');
  });

  it('create a visit as a doctor', async () => {
    page.login('Brooke', '1234');
    page.makeVisit();
    page.logout();
    page = new DoktorkiPage();
    page.login('tester','tester123')
    let bool = await page.checkIsVisitPresent()
    expect(bool).toBe(true);
  });
});
