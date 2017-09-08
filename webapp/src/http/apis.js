const apis = {
  "server": {
    "prod": 'http://server.caols.tech:9999',
    "dev": `http://${document.domain}:9999`
  }
};

const type = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

export const getAPI = (name) => apis[name][type];