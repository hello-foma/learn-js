import {PagePreview} from "./pages";

export const ElementId = {
    menu: 'menu',
    pagesLink: 'pages-link',
    username: 'username',
    loginLink: 'login-link',
    logoutLink: 'logout-link',
    loginPage: 'login-page',
    loginInput: 'login-input',
    loginButton: 'login-button',
    pages: 'pages',
    pagesList: 'pages__list',
    page: 'page',
    pageTitle: 'page__title',
    pageContent: 'page__content',
    errorMessage: 'error-message',
    backToPagesList: 'back-to-pages_List',
};


export const toggleElem = (elem: HTMLElement, isShow: boolean): void => {
    const isForce = typeof isShow === 'boolean';

    elem.classList.toggle('hidden', isForce ? !isShow : undefined);
}

export const getElemById = (id: string): HTMLElement | null => {
        // if we run in node.js
        if (typeof document !== 'object') {
            return null;
        }
    
    return document.getElementById(id);
}


export const onClick = (elemId: string, fn: () => void): void => {
    // if we run in node.js
    if (typeof document !== 'object') {
        return;
    }

    document.addEventListener('click', (event: MouseEvent) => {
        const target  = event.target as HTMLElement;
        if (target.id === elemId) {
            fn();
        }
    });
}

export const setUsername = (username: string): void => {
    const usernameElem = getElemById(ElementId.username) as HTMLElement;

    usernameElem.textContent = `/\u00A0${username}`;
}

export const getLoginInput = (): string => {
    const loginInputElem = getElemById(ElementId.loginInput) as HTMLInputElement;

    return loginInputElem.value;
}

export const setTitle = (text: string): void => {
    const titleElem = getElemById(ElementId.pageTitle) as HTMLElement;

    titleElem.textContent = text;
}

export const setContent = (text: string): void => {
    const contentElem = getElemById(ElementId.pageContent) as HTMLElement;

    contentElem.textContent = text;
}

export const updatePageList = (pages: PagePreview[], goToPage: (pageName: string) => void): void => {
        // if we run in node.js
        if (typeof document !== 'object') {
            return;
        }
        
    const listElem = getElemById(ElementId.pagesList) as HTMLElement;

    listElem.innerHTML = '';

    pages.forEach(page => {
        const liElem = document.createElement('li');

        liElem.innerText = page.title + ': ' + page.text;
        liElem.addEventListener('click', () => {
            goToPage(page.pageName);
        });

        listElem.appendChild(liElem);
    });
}