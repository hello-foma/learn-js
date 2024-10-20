import { Page, Pages, PagesList } from "../pages.ts";

describe('pages.ts', () => {
    let pages: Pages;

    beforeEach(() => {
        pages = new Pages({});
    });

    describe('getPages', () => {
        
        test('Should return empty list if no pages', () => {
            expect(pages.getPages()).toEqual({});
        })

        test('Should return pages if they are exist', () => {
        // set pages
        const expectedPages: PagesList = {'testPage': {
            title: 'Test page title',
              pageName: 'testPage',
              text: 'Text page content'
            }}
        let pages = new Pages(expectedPages);
        

        expect(pages.getPages()).toEqual(expectedPages);
        })

        test('Returned pages should be protected from edit', () => {
        // set pages
        const pagesList: PagesList = {};
        let pages = new Pages(pagesList);

        const pagesToUpdate = pages.getPages();
        pagesToUpdate['newPage'] = {} as Page;

        const pagesAfterUpdate = pages.getPages();

        expect(pagesToUpdate).not.toBe(pagesList);
        expect(pagesToUpdate).not.toBe(pagesAfterUpdate);
        expect(pagesList).toEqual({});
        expect(pagesAfterUpdate).toEqual({});
        expect(pagesToUpdate).toEqual({'newPage': {}});
        })
    });

    test('Should delete page and return undefined', () => {
        // set pages
        const pageToDelete: PagesList = {'testPage': {
            title: 'Test page title',
              pageName: 'testPage',
              text: 'Text page content'
            }}
        let pages = new Pages(pageToDelete);
        
        expect(pages.removePage('testPage')).toBe(true);
        expect(() => pages.readPage('testPage')).toThrow();
    })

    test('Should return existed page', () => {
        // set pages
        const pageToRead: PagesList = {'testPage': {
            title: 'Test page title',
              pageName: 'testPage',
              text: 'Text page content'
            }}
        let pages = new Pages(pageToRead);
        
        expect(pages.readPage('testPage')).toEqual({
                title: 'Test page title',
                pageName: 'testPage',
                text: 'Text page content'
                }
        );
        expect(() => pages.readPage('testPage123')).toThrow();
    })

    test('Should return new page with given properties', () => {

        let pages = new Pages({});
        
        expect(pages.createPage('testPage', 'Test page title', 'Text page content')).toEqual({
                title: 'Test page title',
                pageName: 'testPage',
                text: 'Text page content'
                }
        );
    })

    test('Should return updated page with given properties if it is exists', () => {

        // set pages
        const pageToUpdate: PagesList = {'testPage': {
            title: 'Test page title',
              pageName: 'testPage',
              text: 'Text page content'
            }}
        let pages = new Pages(pageToUpdate);
        
        expect(pages.editPage('testPage', 'New Test page title', 'New Text page content')).toEqual({
                title: 'New Test page title',
                pageName: 'testPage',
                text: 'New Text page content'
                }
        );

        expect(() => pages.editPage('testPage123', 'New Test page title', 'New Text page content')).toThrow();
    })

    test('Should return the short list of existed pages', () => {

        // set pages
        const existedPages: PagesList = {
            'testPage': {
                title: 'Test page title',
                pageName: 'testPage',
                text: '111111111111111000'
            },
            'testPage2': {
                title: 'Test page title 2',
                pageName: 'testPage2',
                text: '222222222222222000'
            }
        }
        let pages = new Pages(existedPages);
        
        expect(pages.listPages()).toEqual([{
                title: 'Test page title',
                pageName: 'testPage',
                text: '111111111111111...'
            },
            {
                title: 'Test page title 2',
                pageName: 'testPage2',
                text: '222222222222222...'
            }]
        );
    })


});