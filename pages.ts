export type Page = {
    pageName: string; 
    title: string; 
    text: string;
};

// PagePreview has different text content (limited)
export type PagePreview = Page;

export type PagesList = {
  [pageName: string]: Page
}
export class Pages {
  constructor(
    private pages: PagesList,
  ) { }

  /**
   * Return readonly pages list
   */
  public getPages(): PagesList {
    return {...this.pages};
  }

  public createPage(pageName: string, title: string, text: string): Page {
    return (this.pages[pageName] = { pageName, title, text, });
  }

  public removePage(pageName: string): boolean {
    delete this.pages[pageName];
    return this.pages[pageName] === undefined;
  }

  public editPage(pageName: string, title: string, text: string): Page {
    const isPageExist = typeof this.pages[pageName] !== 'undefined';
    const page = this.pages[pageName];
    
    if (isPageExist) {
      return (this.pages[pageName] = { ...page, pageName, title, text });
    } else {
      throw new Error("Page undefined");
    }
  }

  public readPage(pageName: string): Page {
    if (this.pages[pageName]) {
      return this.pages[pageName];
    } else {
      throw new Error("Page undefined");
    } 
  }

  public listPages(): PagePreview[] {
    const listOfPages: Page[] = Object.values(this.pages);

    const listOfPreviews: PagePreview[] = listOfPages.map(i => ({
      pageName: i.pageName,
      title: i.title,
      text: i.text ? `${i.text.slice(0, 15)}...` : "",
    })
  )
    return listOfPreviews;
  }
}

