import {Comments} from './comments.js';
import {Pages} from './pages.js';
import {Users} from './users.js';
import {Authorisation} from './authorisation.js';

export function App() {
    let pages = {};
    let comments = [];

    const roles = {
      admin: {
        permissions: {
          all: true,
        },
      },
      editor: {
        permissions: {
          edit: true,
          post: true,
        },
      },
      user: {
        permissions: {
          view: true,
          comment: true,
        },
      },
      visitor: {
        permissions: {
          view: true,
        },
      },
      banned: {
        permissions: null,
      },
      guest: {
        view: true,
      },
    };
  
    const users = {
      albus: {
        role: "admin",
        name: "Albus Dumbledore",
      },
      harry: {
        role: "editor",
        name: "Harry Potter",
      },
      ron: {
        role: "user",
        name: "Ronald Weasley",
      },
      hagrid: {
        role: "visitor",
        name: "Rubeus Hagrid",
      },
      tom: {
        role: "banned",
        name: "Tom Riddle",
      },
    };
  
    function getPageContent(pageName) {
      return `${pageName} content.`;
    }
  
    this.viewPage = function (pageName) {
      if (this.auth.isHaveAccess(App.actions.readPage)) {
        // поправила view на read
        return getPageContent(pageName);
      }
  
      return "You dont't have an access to this page!";
    };
  
    this.auth = new Authorisation(users); // убрала roles
    this.login = (userName) => this.auth.login(userName);
    this.logout = () => this.auth.logout();
  
    this.users = new Users(users);
    this.createUser = (login, userName, role) =>
      this.users.createUser(login, userName, role);
    this.banUser = (login) => this.users.banUser(login);
    
    this.pages = new Pages(pages);
    this.createPage = (pageName, title, text) => this.pages.createPage(pageName, title, text);
    this.editPage = (pageName, title, text) => this.pages.editPage(pageName, title, text);
    this.readPage = (pageName) => {
        const page = this.pages.readPage(pageName);
        
        if (typeof page !== 'object') {
            return 'Unknown page';
        }

        const comments = this.comments.getPageComments(pageName);

        return {
            page,
            comments
        }
    };
    
    this.comments = new Comments(comments, pages);
    this.leaveComment = (pageName, text, time, user) => this.comments.addComment(pageName, text, time, user);
    this.deleteComment = (commentId) => this.comments.deleteComment(commentId);
    this.replyToComment = (commentId, text) => {
        const time = Date.now();
        const user = this.auth.getCurrentUser();

        return this.comments.reply(commentId, time, user, text)
    };
  };

  App.actions = {
    createPage: "createPage",
    deletePage: "deletePage",
    readPage: "readPage",
    editPage: "editPage",
    addComment: "addComment",
  };
    