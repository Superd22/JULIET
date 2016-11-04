import { JULIETPage } from './app.po';

describe('juliet App', function() {
  let page: JULIETPage;

  beforeEach(() => {
    page = new JULIETPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
