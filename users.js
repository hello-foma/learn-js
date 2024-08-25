export function Users(users) {
    this.createUser = function (login, userName, role) {
      users[login] = { role: role, name: userName };
      return users[login] !== undefined;
    };
  
    this.updateUser = function (login, userName, role) {
      if (users[login]) {
        users[login] = { role: role, name: userName };
        return users[login];
      } else {
        return "User undefined";
      }
    };
  
    this.getUserName = function (login) {
      return users[login] ? users[login].name : "User undefined";
    };
  
    // When we ban user, change its role to "banned" and delete all comments from this user
    this.banUser = function (login) {
      if (users[login]) {
        users[login] = { role: "banned", name: users[login].name };
        let cutComments = comments.filter((comment) => comment.author === login);
        let cutCommentsId = [];
        for (let cutComment of cutComments) {
          cutComment.commentId = cutCommentsId;
        }
        for (let cutCommentId in cutCommentsId) {
          comments = comments.filter(
            (comment) => comment.replyTo !== cutCommentId
          );
        }
        comments = comments.filter((comment) => comment.author !== login);
        return login + " was banned";
      } else {
        return "User undefined";
      }
    };
  }