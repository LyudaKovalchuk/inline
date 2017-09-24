import { InlinePage } from './app.po';

describe('inline App', () => {
  let page: InlinePage;

  beforeEach(() => {
    page = new InlinePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
