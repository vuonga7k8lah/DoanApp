import qs from 'qs';
import { CANCEL } from 'redux-saga';
import configureApp from 'utils/constants/configureApp';
import { store } from 'store/configureStore';
import ConfigureAxios from './ConfigureAxios';

interface RefreshTokenResponseData {
  data: {
    accessToken: string;
  };
}

interface AxiosData {
  refreshToken: string;
  accessToken: string;
}

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    baseURL: configureApp.api.baseUrl,
    timeout: configureApp.api.timeout,
    paramsSerializer: qs.stringify,
  },
  setAccessToken() {
    if (!store) {
      return '';
    }
    return '';
  },
  setRefreshToken() {
    if (!store) {
      return '';
    }
    return '';
  },
});

const fetchAPI = axiosConfig.create(CANCEL);

axiosConfig.accessToken({
  setCondition(config) {
    const isAppURL = config?.url?.search(/^http/g) === -1;
    return isAppURL;
  },
});

axiosConfig.refreshToken<RefreshTokenResponseData, AxiosData>({
  url: 'jwt/renew-access-token',
  setRefreshCondition(error) {
    return error.response?.status === 401 && !error.config.url?.includes('jwt/renew-access-token');
  },
  axiosData(refreshToken, accessToken) {
    return {
      refreshToken,
      accessToken,
    };
  },
  success(res, originalRequest) {
    // store.dispatch(
    //   updateToken({
    //     accessToken: res.data.data.accessToken,
    //   }),
    // );
    originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
  },
  failure(error) {
    console.log(error.response);
    // store.dispatch(logout());
    // alertMessageWithOption(i18n.t('tokenExpired'), i18n.t('loginAgain'), onOpenModalLogin);
  },
});

export default fetchAPI;
