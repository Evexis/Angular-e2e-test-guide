import { DoktorkiPage } from './app.po';

describe('doktorki App', function() {
  let page: DoktorkiPage;

  beforeEach(() => {
    page = new DoktorkiPage();
    page.navigateTo();
  });

  it('login label', () => {
    
    expect(page.getParagraphText()).toEqual('login:');
    expect(0).toBe(0);
  });
});
