// Manage comments
let commentCount = 0;

export function Comments(comments, pages) {
    // add comment to the page
    this.addComment = function (pageName, text, time, user) {
      comments.push({
        page: pageName,
        text,
        time,
        author: user,
        id: commentCount,
        replyTo: null,
      });
      pages[pageName] = {
        pageName: pages[pageName].pageName,
        title: pages[pageName].title,
        text: pages[pageName].text,
        comments: [...pages[pageName].comments, {author: comments.author, text: comments[comments.length - 1].text} ],
      };
      commentCount++;
      return comments[comments.length - 1];
    };
  
    this.deleteComment = function (id) {
      let commentIndex = comments.findIndex(
        (comment) => comment.id === id
      );
      comments.splice(commentIndex - 1, 1);
      return (
        comments.findIndex((comment) => comment.id === id) === -1
      );
    };
  
    // add reply to existing the comment
    this.reply = function (id, time, user, text) {
      let comment = comments.find((i) => i.id === id);
      if (comment) {
      comments.push({
        page: comment.page,
        text,
        time,
        author: user,
        id: commentCount,
        replyTo: id,
      });
      commentCount++;
      return comments[comments.length - 1]} else { return false };
    };
  }