import { Page, Pages, PagesList } from "../pages.ts";

describe('pages.ts', () => {
    let pages: Pages;

    beforeEach(() => {
        pages = new Pages({}, []);
    });

    describe('getPages', () => {
        test('Should return empty list if no pages', () => {
            expect(pages.getPages()).toEqual({});
        })
    });

    test('Should return pages if they are exist', () => {
        // set pages
        const expectedPages: PagesList = {'testPage': {
            title: 'Test page title',
             comments: [],
              pageName: 'testPage',
              text: 'Text page content'
            }}
        let pages = new Pages(expectedPages, []);
        

        expect(pages.getPages()).toEqual(expectedPages);
    })

    test('Returned pages should be protected from edit', () => {
        // set pages
        const pagesList: PagesList = {};
        let pages = new Pages(pagesList, []);

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