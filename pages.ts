export type Page = {};
export type PagePreview = {};

export class Pages {
  constructor(pages) {}

  createPage(pageName, title, text) {}
  removePage(pageName) {}
  editPage(pageName, title, text) {}
  readPage(page) {}
  listPages(): PagePreview[] {}
}
