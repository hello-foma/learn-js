// Общий блок
import { App } from './app.js';
import { ElementId, getElemById, getLoginInput, onClick, toggleElem, updatePageList, setUsername } from './dom.js';
  
  const app = new App();

  const NavigationPage = {
    page: 'page',
    login: 'login',
    pageList: 'pageList'
  }

  const navigate = (page) => {
    const loginPageElem = getElemById(ElementId.loginPage);
    const pageElem = getElemById(ElementId.page);
    const pageListElem = getElemById(ElementId.pages);

    toggleElem(loginPageElem, false);
    toggleElem(pageElem, false);
    toggleElem(pageListElem, false);

    switch (page) {
      case NavigationPage.login:
        toggleElem(loginPageElem, true);
        break;
      case NavigationPage.page:
        toggleElem(pageElem, true);
        break;
      case NavigationPage.page:
        toggleElem(pageListElem, true);
        break;
    }
  }

  const goToLoginPage = () => {
    navigate(NavigationPage.login);
  }

  const initButtons = () => {
    onClick(ElementId.loginLink, () => {
      goToLoginPage();
    });

    onClick(ElementId.loginButton, () => {
      const userLogin = getLoginInput();

      console.info(userLogin);

      setUsername(userLogin);


      // TODO: authorise user here
    });

    // TODO: add click event for other navigation buttons
  }

  const navigateToPage = (pageName) => {
    // todo: implement navigation

    console.log(pageName);
  }

  // init app interface
  initButtons();


  // init app content
  app.createPage(33);
  app.createPage('Home page', 'text of home page');
  app.createPage('contact', 'Contacts', 'You can contact us by owl mail');

  updatePageList(app.pages.listPages(), navigateToPage);