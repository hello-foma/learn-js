// Общий блок
import { App } from './app.js';
import { ElementId, getElemById, getLoginInput, onClick, setContent, setTitle, setUsername, toggleElem, updatePageList } from './dom.js';
  
  const app = new App();

  const NavigationPage = {
    page: 'page',
    login: 'login',
    pageList: 'pageList'
  }

  // Отображение элементов на стартовой странице
  const loginLinkElem = getElemById(ElementId.loginLink);
  const loginInputElem = getElemById(ElementId.loginInput);
  const loginButtonElem = getElemById(ElementId.loginButton);
  const logoutLinkElem = getElemById(ElementId.logoutLink);
  const errorMessageElem = getElemById(ElementId.errorMessage);
  const usernameElem = getElemById(ElementId.username);
  const pagesElem = getElemById(ElementId.pages);
  const pagesListElem = getElemById(ElementId.pagesList);
  const backToPagesListElem = getElemById(ElementId.backToPagesList);
  const pageTitleElem = getElemById(ElementId.pageTitle);
  const pageContentElem = getElemById(ElementId.pageContent);
  toggleElem(loginInputElem, false);
  toggleElem(loginButtonElem, false);
  toggleElem(logoutLinkElem, false);
  toggleElem(errorMessageElem, false);
  toggleElem(usernameElem, false);
  toggleElem(pagesElem, false);
  toggleElem(pagesListElem, false);
  toggleElem(backToPagesListElem, false);
  toggleElem(pageTitleElem, true);
  toggleElem(pageContentElem, true);


  const navigate = (page) => {
    const loginPageElem = getElemById(ElementId.loginPage);
    const pageElem = getElemById(ElementId.page);
    const pageListElem = getElemById(ElementId.pagesList);

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
      case NavigationPage.pageList:
        toggleElem(pageListElem, true);
        break;
    }
  }

  const goToLoginPage = () => {
    navigate(NavigationPage.login);
  }
  
  const goToPageList = () => {
    navigate(NavigationPage.pageList);
  }

  const resetInputState = () => {
      getElemById(ElementId.loginInput).value = null;
      toggleElem(errorMessageElem, false);
  }

  const initButtons = () => {
    onClick(ElementId.loginLink, () => {
      goToLoginPage();
      toggleElem(loginInputElem, true);
      toggleElem(loginButtonElem, true);
    });

    onClick(ElementId.loginButton, () => {
      const userLogin = getLoginInput();
      // if login is not empty
      if (userLogin) {
      setUsername(userLogin);

      resetInputState();

      // hide login page
      toggleElem(loginLinkElem, false);
      toggleElem(loginInputElem, false);
      toggleElem(loginButtonElem, false);

      //show username
      toggleElem(usernameElem, true)

      // show logout
      toggleElem(logoutLinkElem, true);
      } else {
        toggleElem(errorMessageElem, true);
      }
    })

    onClick(ElementId.logoutLink, () => {
      goToLoginPage();
      getElemById(ElementId.username).textContent = null;
      toggleElem(loginLinkElem, true);
      toggleElem(loginInputElem, false);
      toggleElem(loginButtonElem, false);
      toggleElem(usernameElem, false)
      toggleElem(logoutLinkElem, false);
    })

    onClick(ElementId.pagesLink, () => {
      toggleElem(pagesElem, true);
      toggleElem(pagesListElem, true);
      // goToPageList();
      toggleElem(pageTitleElem, false);
      toggleElem(pageContentElem, false);
      toggleElem(backToPagesListElem, false);
    })

    onClick(ElementId.backToPagesList, () => {
      toggleElem(backToPagesListElem, false);
      toggleElem(pageTitleElem, false);
      toggleElem(pageContentElem, false);

      toggleElem(pagesListElem, true);


      // goToPageList();
    })

  }

  const navigateToPage = (pageName) => {
    // todo: implement navigation

    console.log(pageName);
   
    const pageData = app.readPage(pageName);
    const page = pageData.page;
  

    if (page) {
        // Обновляем заголовок и контент страницы
        setTitle(page.title);   // Функция для установки заголовка
        setContent(page.text);  // Функция для установки текста страницы

        // Переход к отображению страницы
        navigate(NavigationPage.page);
        toggleElem(pageTitleElem, true);
        toggleElem(pageContentElem, true);
        toggleElem(backToPagesListElem, true);
    } else {
        console.error('Страница не найдена:', pageName);
    }
  }

  // init app interface
  initButtons();


  // init app content
  app.createPage('Home', 'Home page', 'text of home page');
  app.createPage('Griffindor', 'Griffindor page', 'text of griffindor page');
  updatePageList(app.pages.listPages(), navigateToPage);