import { RoleName } from "./roles";

export type User = { 
    name: string;
    role: RoleName;
    login: string;
    } 

export type UsersList = {
    [login: string]: User | undefined
    }


export class Users {

    private users: UsersList;

    constructor(users: UsersList) {
        this.users = users;
    }

    createUser (login: string, userName: string, role: RoleName): boolean {
      this.users[login] = { role: role, name: userName, login };
      return this.users[login] !== undefined;
    }
  
    updateUser (login: string, userName: string, role: string): User | string {
      if (this.users[login]) {
        this.users[login] = { role, name: userName, login };
        return this.users[login];
      } else {
        return "User undefined";
      }
    }

    isUserExists(login: string): boolean {
      return typeof this.users[login] === 'object' && this.users[login] !== null;
    }
  
    getUserName (login: string): string {
      return this.users[login] ? this.users[login].name : "User undefined";
    }
  
    banUser (login: string): string {
      if (this.users[login]) {
        this.users[login] = { role: "banned", name: this.users[login].name, login };
        return login + " was banned";
      } else {
        return "User undefined";
      }
    };
  }