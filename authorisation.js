export function Authorisation(users) {
    let currentUser = null;
    /**
     * Authorise user
     * If user is found, return true
     * If there is no such user, return false
     */
    this.login = function (userName) {
      users[userName] ? (currentUser = users[userName]) : (currentUser = null);
      return users[userName] ? true : false;
      // const namesList = Object.keys(users);
      // return namesList.includes(userName);
    };
  
    /**
     * TODO: logout()
     * end current session working with user
     */
    this.logout = function () {
      currentUser = null;
      return true;
    };
    /**
     * TODO: isHaveAccess(action)
     * Check is user can perform requested app action
     * If no user authorised, then default role "guest" is applied
     */
    this.isHaveAccess = function (action) {
      if (!App.actions[action]) {
        return false;
      }
      if (currentUser !== null) {
        if (currentUser.role === "visitor" || currentUser.role === "guest") {
          switch (action) {
            case App.actions.readPage:
              return true;
            default:
              return false;
          }
        } else if (currentUser.role === "editor") {
          switch (action) {
            case App.actions.editPage:
            case App.actions.createPage:
              return true;
            default:
              return false;
          }
        } else if (currentUser.role === "user") {
          switch (action) {
            case App.actions.readPage:
            case App.actions.addComment:
              return true;
            default:
              return false;
          }
        } else if (currentUser.role === "admin") {
          return true;
        } else if (currentUser.role === "banned") {
          return false;
        }
      } else {
        switch (action) {
          case App.actions.readPage:
            return true;
          default:
            return false;
        }
      }
    };
  
    /** TODO: getUserName()
     * Return name of current user
     * If there is no user, return "User" string
     */
    this.getUserName = function () {
      return currentUser ? currentUser.name : "User";
    };
  }