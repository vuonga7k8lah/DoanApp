import configureApp from 'utils/constants/configureApp';

export const isSearch = (url: string) => /(\?|&)(s|q)=/.test(url);

export const getUrl = (url: string, path: string, value: string) => {
  let result = url || `${configureApp.api.baseUrl}${path}`;
  if (isSearch(result)) {
    result = result.replace(/(\?|&)(s|q)=/g, s => s + value);
  }
  return result;
};
