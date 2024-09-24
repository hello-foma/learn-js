import { PagesList } from "./pages";

export type Comment = {
    page: string;
    text: string;
    time: number;
    author: string;
    id: number;
    replyTo: number | null;
};

let commentCount = 0;

export class Comments {
    private comments: Comment[];
    private pages: PagesList;

    constructor(comments: Comment[], pages: PagesList) {
        this.comments = comments;
        this.pages = pages;
    }
    
    addComment(pageName: string, text: string, time: number, user: string): Comment {
      this.comments.push({
        page: pageName,
        text,
        time,
        author: user,
        id: commentCount,
        replyTo: null,
      });
      this.pages[pageName] = {
        pageName: this.pages[pageName].pageName,
        title: this.pages[pageName].title,
        text: this.pages[pageName].text,
        comments: [...this.pages[pageName].comments],
      };
      commentCount++;
      return this.comments[this.comments.length - 1];
    }
  
    deleteComment(id: number): boolean {
      let commentIndex = this.comments.findIndex(
        (comment) => comment.id === id
      );
      this.comments.splice(commentIndex - 1, 1);
      return (
        this.comments.findIndex((comment) => comment.id === id) === -1
      );
    }
  
    reply(id: number, time: number, user: string, text: string): Comment | boolean {
      let comment = this.comments.find((i) => i.id === id);
      if (comment) {
      this.comments.push({
        page: comment.page,
        text,
        time,
        author: user,
        id: commentCount,
        replyTo: id,
      });
      commentCount++;
      return this.comments[this.comments.length - 1]} else { return false };
    }

    getPageComments(pageName: string): Comment[] {
      return this.comments.filter((comment) => comment.page === pageName);
    }
  }