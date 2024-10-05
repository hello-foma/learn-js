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

/**
 * Show or hide elem on page
 * @param {HTMLElement} elem  element to toggle visibility
 * @param {function} isShow optional flag if element should be visible. If flag is not provided, toggle visibility opposite to current state
 */
export const toggleElem = (elem, isShow) => {
    const isForce = typeof isShow === 'boolean';

    elem.classList.toggle('hidden', isForce ? !isShow : undefined);
}

/**
 * Find elem on page
 * @param {string} id html id of the elem to find
 * @returns HTMLElement | null
 */
export const getElemById = (id) => {
        // if we run in node.js
        if (typeof document !== 'object') {
            return;
        }

    return document.getElementById(id);
}

/**
 * Assign provided callback funciton fn and execute it when user clicks on element
 * @param {string} elemId html id of element to assign click callback
 * @param {*} fn callback funciton to run on click
 */
export const onClick = (elemId, fn) => {
    // if we run in node.js
    if (typeof document !== 'object') {
        return;
    }

    document.addEventListener('click', (event) => {
        if (event.target.id === elemId) {
            fn();
        }
    });
}

/**
 * Update text on header element "username"
 * @param {string} username 
 */
export const setUsername = (text) => {
    const usernameElem = getElemById(ElementId.username);

    usernameElem.textContent = text;
}

/**
 * Get text value of login input
 * @returns string
 */
export const getLoginInput = () => {
    const loginInputElem = getElemById(ElementId.loginInput);

    return loginInputElem.value;
}

/**
 * Set value of Page title, update HTML elem with text
 * @param {string} text text to place at page title
 */
export const setTitle = (text) => {
    const titleElem = getElemById(ElementId.pageTitle);

    titleElem.textContent = text;
}

/**
 * Set text of Page Content, update HTML elem with text
 * @param {string} text text to place at page content
 */
export const setContent = (text) => {
    const titleElem = getElemById(ElementId.pageTitle);

    titleElem.textContent = text;
}

/**
 * Updates list of pages preview html element. Creates a new element for each page and assign callback on click for every elem
 * @param {object[]} pages page preview list to show
 * @param {function} goToPage callback function that will be called on page preview click
 */
export const updatePageList = (pages, goToPage) => {
        // if we run in node.js
        if (typeof document !== 'object') {
            return;
        }
        
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