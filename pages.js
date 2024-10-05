// Manage App's pages

export function Pages(pages) {
    this.createPage = function (pageName, title, text) {
      return (pages[pageName] = { pageName, title, text, comments: [] });
    };
  
    this.removePage = function (pageName) {
      delete pages[pageName];
      return pages[pageName] === undefined;
    };
  
    this.editPage = function (pageName, title, text) {
      if (pages[pageName]) {
        return (pages[pageName] = { title, text, comments: [] });
      } else {
        return "Page undefined";
      }
    };
  
    this.readPage = function (pageName) {
      return pages[pageName] ? pages[pageName] : "Page undefined";
    };
  
    // return list of all pages with content preview
    this.listPages = function () {
      let listOfPages = Object.values(pages);
      for (let i = 0; i < listOfPages.length; i++) {
        listOfPages[i] = {
          pageName: listOfPages[i].pageName,
          title: listOfPages[i].title,
          text: listOfPages[i].text ? `${listOfPages[i].text.slice(0, 15)}...` : "",
        };
      }
      return listOfPages;
    };
  }