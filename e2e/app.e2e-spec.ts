import { ForumSystemClientPage } from './app.po';

describe('forum-system-client App', function() {
  let page: ForumSystemClientPage;

  beforeEach(() => {
    page = new ForumSystemClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
