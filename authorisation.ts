import { App } from './app';
import {UsersList, User} from './users'

export class Authorisation {

  private users: UsersList | null;
  private currentUser: User | null = null;

  constructor(users: UsersList | null) {
      this.users = users;
  }
    
    /**
     * Authorise user
     * If user is found, return true
     * If there is no such user, return false
     */
    login (userName: string): boolean {
      if (this.users === null) {
        this.currentUser = null;
        return false;
      }

      const existedUser = this.users[userName];
      if (existedUser) {
        this.currentUser = existedUser;
        return true;
      } else {
        this.currentUser = null;
        return false;
      }
    };

    // login (userName: string): boolean {
    //   if (this.users !== null) {
    //     const existedUser: User = this.users[userName];
    //     if (existedUser) {
    //       this.currentUser = existedUser;
    //       return true;
    //     } 
    //   } 
    //     this.currentUser = null;
    //     return false;
    // };
  
    /**
     * TODO: logout()
     * end current session working with user
     */
    logout (): boolean {
      this.currentUser = null;
      return true;
    };

    /**
     * TODO: isHaveAccess(action)
     * Check is user can perform requested app action
     * If no user authorised, then default role "guest" is applied
     */
    isHaveAccess (action: keyof typeof App.actions): boolean {
      if (!App.actions[action]) {
        return false;
      }
      if (this.currentUser !== null) {
        if (this.currentUser.role === "visitor" || this.currentUser.role === "guest") {
          switch (action) {
            case App.actions.readPage:
              return true;
            default:
              return false;
          }
        } else if (this.currentUser.role === "editor") {
          switch (action) {
            case App.actions.editPage:
            case App.actions.createPage:
              return true;
            default:
              return false;
          }
        } else if (this.currentUser.role === "user") {
          switch (action) {
            case App.actions.readPage:
            case App.actions.addComment:
              return true;
            default:
              return false;
          }
        } else if (this.currentUser.role === "admin") {
          return true;
        } else if (this.currentUser.role === "banned") {
          return false;
        }
      } 
        switch (action) {
          case App.actions.readPage:
            return true;
          default:
            return false;
      }
    };
  
    /** TODO: getUserName()
     * Return name of current user
     * If there is no user, return "User" string
     */
    getUserName (): User | string {
      return this.currentUser ? this.currentUser.name : "User";
    };

    getCurrentUser (): User | null {
      return this.currentUser;
    }
  }