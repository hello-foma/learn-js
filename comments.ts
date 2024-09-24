import { PagesList } from "./pages";
import { User } from "./users";

export type Comment = {
    page: string;
    text: string;
    time: number;
    author: string;
    id: number;
    replyTo: number | null;
    // userName: string | null; 
};

let commentCount = 0;

export class Comments {
    private comments: Comment[];
    private pages: PagesList;

    constructor(comments: Comment[], pages: PagesList) {
        this.comments = comments;
        this.pages = pages;
    }
    
    addComment(pageName: string, text: string, time: number, user: string) {
      this.comments.push({
        page: pageName,
        text,
        time,
        author: user,
        id: commentCount,
        replyTo: null,
        // userName: null,
      });
      this.pages[pageName] = {
        pageName: this.pages[pageName].pageName,
        title: this.pages[pageName].title,
        text: this.pages[pageName].text,
        comments: [...this.pages[pageName].comments, {author: comments.author, text: comments[comments.length - 1].text} ],
      };
      commentCount++;
      return this.comments[this.comments.length - 1];
    }
  
    deleteComment(id: number) {
      let commentIndex = this.comments.findIndex(
        (comment) => comment.id === id
      );
      this.comments.splice(commentIndex - 1, 1);
      return (
        this.comments.findIndex((comment) => comment.id === id) === -1
      );
    }
  
    reply(id: number, time: number, user: string, text: string) {
      let comment = this.comments.find((i) => i.id === id);
      if (comment) {
      this.comments.push({
        page: comment.page,
        text,
        time,
        author: user,
        id: commentCount,
        replyTo: id,
        // userName: user.name
      });
      commentCount++;
      return this.comments[this.comments.length - 1]} else { return false };
    }

    getPageComments(pageName: string) {
      return this.comments.filter((comment) => comment.page === pageName);
    }
  }