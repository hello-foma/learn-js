import { Comment } from "./comments";

export type User = { 
    name: string;
    role: string;
    }

export type UsersList = {
    [login: string]: User
    }


export class Users {

    private users: UsersList;
    private comments: Comment[];

    constructor(users: UsersList, comments: Comment[]) {
        this.users = users;
        this.comments = comments;
    }

    createUser (login: string, userName: string, role: string): boolean {
      this.users[login] = { role: role, name: userName };
      return this.users[login] !== undefined;
    }
  
    updateUser (login: string, userName: string, role: string): User | string {
      if (this.users[login]) {
        this.users[login] = { role: role, name: userName };
        return this.users[login];
      } else {
        return "User undefined";
      }
    }
  
    getUserName (login: string): string {
      return this.users[login] ? this.users[login].name : "User undefined";
    }
  
    banUser (login: string): string {
      if (this.users[login]) {
        this.users[login] = { role: "banned", name: this.users[login].name };
        let cutComments = this.comments.filter((comment) => comment.author === login);
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
    };
  }