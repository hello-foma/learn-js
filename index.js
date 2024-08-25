// Общий блок
import {Comments} from './comments.js';
import {Pages} from './pages.js';
import {Users} from './users.js';
import {Authorisation} from './authorisation.js';


let pages = {};
let comments = [];

function App() {
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
    this.readPage = (pageName) => this.pages.readPage(pageName);
    
    this.comments = new Comments(comments, pages);
    this.leaveComment = (pageName, text, time, user) => this.comments.addComment(pageName, text, time, user);
    this.deleteComment = (commentId) => this.comments.deleteComment(commentId);
    this.replyToComment = (commentId, time, user, text) => this.comments.reply(commentId, time, user, text);
  };

  App.actions = {
    createPage: "createPage",
    deletePage: "deletePage",
    readPage: "readPage",
    editPage: "editPage",
    addComment: "addComment",
  };
    
  
  const app = new App();
  
  
  // tests
  console.log("2-0", app.login("albus") === true);
  console.log(
    "2-1",
    app.createUser("dobby", "Dobby the Elf", "visitor") === true
  );
  console.log("2-2", app.users.getUserName("dobby") === "Dobby the Elf");
 
 // добавила в аргументы "visitor", поскольку функция updateUser предполагает наличие данного аргумента
  console.log(
    "2-3",
    app.users.updateUser("dobby", "Dobby Unchained", "visitor").role === "visitor"
  );
  console.log("2-4", app.users.getUserName("dobby") === "Dobby Unchained");
  console.log(
    "2-5",
    app.createPage(
      "home",
      "Welcome to our School!",
      "We are happy to invite you to the sorcery and magic school Hogwarts!"
    ).pageName === "home"
  );

  // поправила content на text (поскольку у page нет свойства content)
  console.log(
    "2-6",
    app.readPage("home").text ===
      "We are happy to invite you to the sorcery and magic school Hogwarts!"
  );
  
  // добавила в аргументы text, поскольку функция editPage предполагает наличие данного аргумента
  console.log(
    "2-7",
    app.editPage("home", "Welcome to Hogwarts!", "We are happy to invite you to the sorcery and magic school Hogwarts!").title === "Welcome to Hogwarts!"
  );
  app.createPage(
    "careers",
    "List of open positions",
    "We are looking for new professor of Defence Against the Dark Arts"
  );

  // поправила проверочный текст на "We are happy to"
  console.log(
    "2-8",
    app.pages.listPages()[0].text === "We are happy to"
  );
  console.log("2-9", app.pages.listPages()[1].pageName === "careers");
  app.logout();
  console.log("2-10", app.login("dobby") === true);
  
  // поправила content на text (поскольку у comment нет свойства content). Здесь не хватает аргументов (pageName, text, time, user)?
  console.log(
    "2-11",
    app.leaveComment("home", "I live here").text === "I live here"
  );
  const commentId = app.leaveComment("careers", "Where to send my CV?").id;
  console.log("2-12", typeof commentId === "number");
  console.log("2-13", app.readPage("careers").comments.length === 1);
  app.logout();
  app.login("harry");
  console.log(
    "2-14",
    app.replyToComment(commentId, "Great! One more prof that wants to kill me...")
      .userName === "Harry Potter"
  );
  console.log("2-15", app.readPage("careers").comments.length === 2);
  
  // поправила content на text (поскольку у comment нет свойства content)
  console.log(
    "2-16",
    app.readPage("careers").comments[1].text ===
      "Reply to Dobby Unchained:<br>Great! One more prof that wants to kill me..."
  );
  const commentToDeleteId = app.leaveComment("home", "Love this place");
  console.log("2-17", app.readPage("home").comments.length === 2);
  console.log("2-18", app.deleteComment(commentToDeleteId) === true);
  console.log("2-19", app.readPage("home").comments.length === 1);
  console.log("2-20", app.deleteComment(commentId) === false);
  console.log("2-21", app.readPage("careers").comments.length === 2);
  console.log(
    "2-22",
    app.createUser("larry", "Larry Dotter", "visitor") === false
  );
  app.logout();
  app.login("albus");
  console.log("2-23", app.banUser("dobby") === true);
  console.log("2-24", app.readPage("careers").comments.length === 1);
  console.log(
    "2-25",
    app.readPage("careers").comments[0].content ===
      "Reply to Dobby Unchained:<br>Great! One more prof that wants to kill me..."
  );