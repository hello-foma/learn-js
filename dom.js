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
    pageTitle: 'pageTitle',
    pageContent: 'pageContent',
};

export const toggleElem = (elem, isShow) => {
    const isForce = typeof isShow === 'boolean';

    elem.classList.toggle('hidden', isForce ? !isShow : undefined);
}

export const getElemById = (id) => {
    return document.getElementById(id);
}

export const onClick = (elemId, fn) => {
    document.addEventListener('click', (event) => {
        if (event.target.id === elemId) {
            fn();
        }
    });
}

export const setUsername = (username) => {
    const usernameElem = getElemById(ElementId.username);

    usernameElem.textContent = text;
}

export const getLoginInput = () => {
    const loginInputElem = getElemById(ElementId.loginInput);

    return loginInputElem.value;
}

export const setTitle = (text) => {
    const titleElem = getElemById(ElementId.pageTitle);

    titleElem.textContent = text;
}

export const setContent = (text) => {
    const titleElem = getElemById(ElementId.pageTitle);

    titleElem.textContent = text;
}

export const updatePageList = (pages, goToPage) => {
    const listElem = getElemById(ElementId.pagesList);

    listElem.innerHtml = '';

    pages.forEach(page => {
        const liElem = document.createElement('li');

        liElem.innerText = page.title + ': ' + page.text;
        liElem.addEventListener('click', () => {
            goToPage(page.pageName);
        });

        listElem.appendChild(liElem);
    });
}