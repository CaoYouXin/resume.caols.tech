const apis = {
  "server": {
    "prod": 'http://server.caols.tech:9999',
    "dev": `http://${document.domain}:9999`
  },
  "book/list": {
    "prod": 'http://server.caols.tech:9999/api/diary/client/list/book',
    "dev": `http://${document.domain}:9999/api/diary/client/list/book`
  },
  "page/list": {
    "prod": (bookId) => `http://server.caols.tech:9999/api/diary/client/list/page/${bookId}`,
    "dev": (bookId) => `http://${document.domain}:9999/api/diary/client/list/page/${bookId}`
  },
  "page/get": {
    "prod": (pageId) => `http://server.caols.tech:9999/api/diary/client/get/page/${pageId}`,
    "dev": (pageId) => `http://${document.domain}:9999/api/diary/client/get/page/${pageId}`
  }
};

const type = process.env.NODE_ENV === 'production' ? 'prod' : 'prod';

export const getAPI = (name) => apis[name][type];