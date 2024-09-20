export type Page = {
    pageName: string; 
    title: string; 
    text: string;
    comments: Comments[];
};

export type Comments = {
    page: string;
    text: string;
    time: number;
    author: string;
    id: number;
    replyTo?: number | null;
    userName?: string;
};

export type PagePreview = {
    pageName: string; 
    title: string; 
    text: string;
};

export class Pages {
  private pages: Page;
  
  constructor(pages: Page) {
    this.pages = pages;
  }

  createPage(pageName: string, title: string, text: string): Page {
    return (this.pages[pageName] = { pageName, title, text, comments: [] });
  }

  removePage(pageName: string): boolean {
    delete this.pages[pageName];
    return this.pages[pageName] === undefined;
  }
  editPage(pageName: string, title: string, text: string): Page | string {
    if (this.pages[pageName]) {
      return (this.pages[pageName] = { pageName, title, text, comments: [] });
    } else {
      return "Page undefined";
    }
  }

  readPage(pageName: string): Page | string {
    return this.pages[pageName] ? this.pages[pageName] : "Page undefined";
  }

  listPages(): PagePreview[] {
    let listOfPages: PagePreview[] = Object.values(this.pages).map(i => {
      const page = i as unknown as Page;
      return {
      pageName: page.pageName,
      title: page.title,
      text: page.text ? `${page.text.slice(0, 15)}...` : "",
      }
    });

    return listOfPages;
  }
}