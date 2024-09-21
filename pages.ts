export type Page = {
    pageName: string; 
    title: string; 
    text: string;
    comments: Comment[];
};

export type Comment = {
    page: string;
    text: string;
    time: number;
    author: string;
    id: number;
    replyTo: number | null;
    userName?: string;
};

export type PagePreview = {
    pageName: string; 
    title: string; 
    text: string;
};

export class Pages {
  private pages: Page[];
  
  constructor(pages: Page[]) {
    this.pages = pages;
  }

  createPage(pageName: string, title: string, text: string): Page {
    return (this.pages[pageName] = { pageName, title, text, comments: [] });
  }

  removePage(pageName: string): boolean {
    delete this.pages[pageName];
    return this.pages[pageName] === undefined;
  }
  editPage(pageName: string, title: string, text: string): Page {
    if (this.pages[pageName]) {
      return (this.pages[pageName] = { pageName, title, text, comments: [] });
    } else {
      throw new Error("Page undefined");
    }
  }

  readPage(pageName: string): Page {
    if (this.pages[pageName]) {
      return this.pages[pageName];
    } else {
      throw new Error("Page undefined");
    } 
  }

  listPages(): PagePreview[] {
    let listOfPages: PagePreview[] = Object.values(this.pages).map(i => ({
      pageName: i.pageName,
      title: i.title,
      text: i.text ? `${i.text.slice(0, 15)}...` : "",
    })
  )
    return listOfPages;
  }
}