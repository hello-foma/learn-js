import {Users} from './users.ts'
import {usersExisted} from './usersExisted.ts'
import {Pages, PagesList} from './pages.ts'
import  {Comments, Comment} from './comments.ts'
import {Authorisation} from './authorisation.ts'

export class App {
    public pages: PagesList = {};
    public comments: Comment[]  = [];

    private users = new Users(usersExisted);
    public pagesService = new Pages(this.pages);
    private commentsService = new Comments(this.comments);
    private auth = new Authorisation(usersExisted);

    static actions = {
        createPage: "createPage",
        deletePage: "deletePage",
        readPage: "readPage",
        editPage: "editPage",
        addComment: "addComment",
    };
  
    getPageContent(pageName: string) {
      return `${pageName} content.`;
    }
  
    viewPage (pageName: string): string {
      if (this.auth.isHaveAccess(App.actions.readPage)) {
        return this.getPageContent(pageName);
     }
     return "You dont't have an access to this page!";
    };
  
    login (userName: string): void {
        this.auth.login(userName);
    }
   
    logout (): void {
        this.auth.logout();
    }
  
    createUser (login: string, userName: string, role: string) {
      this.users.createUser(login, userName, role);
    }
    banUser (login: string): string {
        if (this.users.isUserExists(login)) {
          this.users.banUser(login);
          
          let cutComments = this.commentsService.getUserComments(login);
          let cutCommentsId = cutComments.map(i => i.id); 
          for (let cutCommentId of cutCommentsId) {
            this.comments = this.comments.filter(
              (comment) => comment.replyTo !== cutCommentId
            );
          }
          this.comments = this.comments.filter((comment) => comment.author !== login);
          return login + " was banned";
        } else {
          return "User undefined";
        }
    }
    

    createPage (pageName: string, title: string, text: string) {
        this.pagesService.createPage(pageName, title, text);
    }
    editPage (pageName: string, title: string, text: string) {
        this.pagesService.editPage(pageName, title, text);
    }
    readPage (pageName: string) {
        const page = this.pagesService.readPage(pageName);
        const comments = this.commentsService.getPageComments(pageName);
        if (typeof page !== 'object') {
            return 'Unknown page';
        } else {
            return {page, comments}
        }
    };
    
    leaveComment (pageName: string, text: string, time: number, user: string) {
        this.commentsService.addComment(pageName, text, time, user);
    }
    deleteComment (commentId: number) {
            this.commentsService.deleteComment(commentId);
    }
    replyToComment (commentId: number, text: string) {
        const time = Date.now();
        const user = this.auth.getCurrentUser()?.name;
        if (!user) {
            throw new Error("User is not logged in");
        }
        return this.commentsService.reply(commentId, time, user, text)
    };
  };



