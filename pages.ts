import { Comment } from "./comments";

export type Page = {
    pageName: string; 
    title: string; 
    text: string;
    comments: Comment[];
};

export type PagePreview = {
    pageName: string; 
    title: string; 
    text: string;
};

export type PagesList = {
  [pageName: string]: Page
}


export class Pages {
  private comments: Comment[];

  public getPages(): PagesList {
    return {...this.pages};
  }
  
  constructor(
    private pages: PagesList,
    comments: Comment[],
  ) {
    this.comments = comments.filter( () => true);
  }

  public updatePageComments(pageName: string, comment: Comment[]) {
    this.pages[pageName].comments = comment;
  }

  private createPage(pageName: string, title: string, text: string): Page {
    return (this.pages[pageName] = { pageName, title, text, comments: [] });
  }

  private removePage(pageName: string): boolean {
    delete this.pages[pageName];
    return this.pages[pageName] === undefined;
  }

  private editPage(pageName: string, title: string, text: string): Page {
    const isPageExist = typeof this.pages[pageName] !== 'undefined';
    const page = this.pages[pageName];
    
    if (isPageExist) {
      return (this.pages[pageName] = { ...page, pageName, title, text });
    } else {
      throw new Error("Page undefined");
    }
  }

  private readPage(pageName: string): Page {
    if (this.pages[pageName]) {
      return this.pages[pageName];
    } else {
      throw new Error("Page undefined");
    } 
  }

  private listPages(): PagePreview[] {
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
export { Comment };

