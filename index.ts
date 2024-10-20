import { App } from './app.ts';
import { ElementId, getElemById, getLoginInput, onClick, setContent, setTitle, setUsername, toggleElem, updatePageList } from './dom.ts';
import { Page, Pages } from './pages.ts';
  
  const app = new App();

  const NavigationPage = {
    page: 'page',
    login: 'login',
    pageList: 'pageList'
  }

  const isHTMLElem = (elem: HTMLElement | null): elem is HTMLElement => {
    if (elem === null) {
      return false;
    } else {
      return true;
    }
  }

  const toggleIfExist = (elem: HTMLElement | null, isShow: boolean) => {
    if (!isHTMLElem(elem)) {
      throw new Error('Element doesnt exist');
    }

    toggleElem(elem, isShow);
  }

  // Отображение элементов на стартовой странице
  const loginLinkElem = getElemById(ElementId.loginLink);
  const loginInputElem = getElemById(ElementId.loginInput);
  const loginButtonElem = getElemById(ElementId.loginButton) ;
  const logoutLinkElem = getElemById(ElementId.logoutLink);
  const errorMessageElem = getElemById(ElementId.errorMessage);
  const usernameElem = getElemById(ElementId.username);
  const pagesElem = getElemById(ElementId.pages);
  const pagesListElem = getElemById(ElementId.pagesList);
  const backToPagesListElem = getElemById(ElementId.backToPagesList);
  const pageTitleElem = getElemById(ElementId.pageTitle);
  const pageContentElem = getElemById(ElementId.pageContent);

  toggleIfExist(loginInputElem, false);
  toggleIfExist(loginButtonElem, false);
  toggleIfExist(logoutLinkElem, false);
  toggleIfExist(errorMessageElem, false);
  toggleIfExist(usernameElem, false);
  toggleIfExist(pagesElem, false);
  toggleIfExist(pagesListElem, false);
  toggleIfExist(backToPagesListElem, false);
  toggleIfExist(pageTitleElem, true);
  toggleIfExist(pageContentElem, true);


  const navigate = (page: string): void => {
    const loginPageElem = getElemById(ElementId.loginPage);
    const pageElem = getElemById(ElementId.page);
    const pageListElem = getElemById(ElementId.pagesList);

    toggleIfExist(loginPageElem, false);
    toggleIfExist(pageElem, false);
    toggleIfExist(pageListElem, false);

    switch (page) {
      case NavigationPage.login:
        toggleIfExist(loginPageElem, true);
        break;
      case NavigationPage.page:
        toggleIfExist(pageElem, true);
        break;
      case NavigationPage.pageList:
        toggleIfExist(pageListElem, true);
        break;
    }
  }

  const goToLoginPage = (): void => {
    navigate(NavigationPage.login);
  }
  
  const goToPageList = (): void => {
    navigate(NavigationPage.pageList);
  }

  const resetInputState = (): void => {
    const loginInputElem = getElemById(ElementId.loginInput) as HTMLInputElement | null;

    // Проверяем, что элемент найден (не равен null)
    if (loginInputElem === null) {
        throw new Error('Input element not found');
    }

    // Сбрасываем значение поля ввода
    loginInputElem.value = '';  

    // Скрываем сообщение об ошибке, если оно существует
    if (errorMessageElem) {
        toggleIfExist(errorMessageElem, false);
    }
};

  const initButtons = (): void => {
    onClick(ElementId.loginLink, () => {
      goToLoginPage();
      toggleIfExist(loginInputElem, true);
      toggleIfExist(loginButtonElem, true);
    });

    onClick(ElementId.loginButton, () => {
      const userLogin = getLoginInput();
      // if login is not empty
      if (userLogin) {
      setUsername(userLogin);

      resetInputState();

      // hide login page
      toggleIfExist(loginLinkElem, false);
      toggleIfExist(loginInputElem, false);
      toggleIfExist(loginButtonElem, false);

      //show username
      toggleIfExist(usernameElem, true)

      // show logout
      toggleIfExist(logoutLinkElem, true);
      } else {
        toggleIfExist(errorMessageElem, true);
      }
    })

    onClick(ElementId.logoutLink, () => {
      goToLoginPage();
      const elementIdUsername = getElemById(ElementId.username) as HTMLElement | null;

    // Проверяем, что элемент найден (не равен null)
    if (elementIdUsername === null) {
        throw new Error('Username not found');
    }
      elementIdUsername.textContent = '';
      toggleIfExist(loginLinkElem, true);
      toggleIfExist(loginInputElem, false);
      toggleIfExist(loginButtonElem, false);
      toggleIfExist(usernameElem, false)
      toggleIfExist(logoutLinkElem, false);
    })

    onClick(ElementId.pagesLink, () => {
        toggleIfExist(pagesElem, true);
        toggleIfExist(pagesListElem, true);
      // goToPageList();
      toggleIfExist(pageTitleElem, false);
      toggleIfExist(pageContentElem, false);
      toggleIfExist(backToPagesListElem, false);
    })

    onClick(ElementId.backToPagesList, () => {
        toggleIfExist(backToPagesListElem, false);
        toggleIfExist(pageTitleElem, false);
        toggleIfExist(pageContentElem, false);

        toggleIfExist(pagesListElem, true);


      // goToPageList();
    })

  }

  const navigateToPage = (pageName: string): void => {
    // todo: implement navigation

    console.log(pageName);
   
    const pageData = app.readPage(pageName);
    if (typeof pageData !== 'string') {
        const page = pageData.page;
    if (page) {
        // Обновляем заголовок и контент страницы
        setTitle(page.title);   // Функция для установки заголовка
        setContent(page.text);  // Функция для установки текста страницы

        // Переход к отображению страницы
        navigate(NavigationPage.page);
        toggleIfExist(pageTitleElem, true);
        toggleIfExist(pageContentElem, true);
        toggleIfExist(backToPagesListElem, true);
    } else {
        console.error('Страница не найдена:', pageName);
    }
  } else {
    console.error('Неверный тип:', pageName);
    }
  }

  // init app interface
  initButtons();


  // init app content
  app.createPage('Home', 'Home page', 'text of home page');
  app.createPage('Griffindor', 'Griffindor page', 'text of griffindor page');
  updatePageList(app.pagesService.listPages(), navigateToPage);