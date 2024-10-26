import { App } from './app.ts';
import { ElementId, getElemById, getLoginInput, onClick, setContent, setTitle, setUsername, toggleElem, updatePageList } from './dom.ts';
import { Page, Pages } from './pages.ts';
import { getCommentInputText, updateComments } from './dom.ts';
  
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
  const commentsAreaElem = getElemById(ElementId.commentsArea);
  const userErrorMessageElem = getElemById(ElementId.userErrorMessage);



  toggleIfExist(loginInputElem, false);
  toggleIfExist(loginButtonElem, false);
  toggleIfExist(logoutLinkElem, false);
  toggleIfExist(errorMessageElem, false);
  toggleIfExist(usernameElem, false);
  toggleIfExist(pagesElem, false);
  toggleIfExist(pagesListElem, false);
  toggleIfExist(backToPagesListElem, false);
  toggleIfExist(pageTitleElem, true);
  toggleIfExist(commentsAreaElem, false);
  toggleIfExist(userErrorMessageElem , false);



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
        if (app.login(userLogin)) {
          setUsername(userLogin);

          resetInputState();
    
          // hide login page
          toggleIfExist(loginLinkElem, false);
          toggleIfExist(loginInputElem, false);
          toggleIfExist(loginButtonElem, false);
          toggleIfExist(userErrorMessageElem , false)
    
          //show username
          toggleIfExist(usernameElem, true)
    
          // show logout
          toggleIfExist(logoutLinkElem, true);
        } else {
          // @TODO: добавить стили
          toggleIfExist(userErrorMessageElem , true);
          toggleIfExist(errorMessageElem, false);
        }
      } else {
        toggleIfExist(errorMessageElem, true);
        toggleIfExist(userErrorMessageElem , false);
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
      toggleIfExist(commentsAreaElem, false);
    })

    onClick(ElementId.backToPagesList, () => {
        toggleIfExist(backToPagesListElem, false);
        toggleIfExist(pageTitleElem, false);
        toggleIfExist(pageContentElem, false);
        toggleIfExist(commentsAreaElem, false);

        toggleIfExist(pagesListElem, true);


      // goToPageList();
    })
    onClick(ElementId.commentTextButton, () => {
      const commentText = getCommentInputText();
      
      app.leaveComment(commentText);
      const pageComments = app.getPageComments();
      updateComments(pageComments);
  })
};

  const navigateToPage = (pageName: string): void => {
    const pageData = app.readPage(pageName);
    if (typeof pageData !== 'string') {
        const page = pageData.page;
    if (page) {
        // Обновляем заголовок и контент страницы
        setTitle(page.title);   // Функция для установки заголовка
        setContent(page.text);  // Функция для установки текста страницы
        app.setCurrentPage(pageName);

        // Переход к отображению страницы
        navigate(NavigationPage.page);
        toggleIfExist(pageTitleElem, true);
        toggleIfExist(pageContentElem, true);
        toggleIfExist(backToPagesListElem, true);
        if (app.isAuthorized()) {
        toggleIfExist(commentsAreaElem, true);
        }
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
  updatePageList(app.listPages(), navigateToPage);