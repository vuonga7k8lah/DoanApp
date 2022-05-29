// import fetchAPI from 'utils/functions/fetchAPI';
// import { AxiosResponse } from 'axios';
// import { TabNavigator } from 'models/TabNavigator';
import { takeLatest, put } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';
import { getTabNavigator } from '../actions/actionTabNavigator';

function* handleTabNavigator({ payload: _payload }: ReturnType<typeof getTabNavigator.request>) {
  try {
    // const res: AxiosResponse<TabNavigator> = yield call(fetchAPI.request, {
    //   url: payload.endpoint,
    // });
    // console.log(res);
    // yield put(getTabNavigator.success(res.data.data));
    yield put(
      getTabNavigator.success({
        settings: {
          backgroundColor: '#fff',
          color: '#111',
          colorActive: '#446084',
        },
        tabs: [
          {
            id: 'home',
            enable: true,
            iconColor: '#000000',
            iconName: 'home',
            label: 'Home',
            path: '/',
          },
          {
            id: 'ourstores',
            enable: true,
            iconColor: '#000000',
            iconName: 'server',
            label: 'Tuyển sinh',
            path: '/tuyen-sinh',
          },
          {
            id: 'cart',
            enable: true,
            iconColor: '#000000',
            iconName: 'grid',
            label: 'Tài khoản',
            path: '/category/tin-tuc-va-su-kien/',
          },
          // {
          //   id: 'shop',
          //   enable: true,
          //   iconColor: '#000000',
          //   iconName: 'grid',
          //   label: 'Tin tức',
          //   path: '/tin-tuc',
          // },
        ],
      }),
    );
  } catch (err) {
    const error = (err as unknown) as any;
    console.log(error.response);
    yield put(getTabNavigator.failure('error'));
  }
}

export function* watchTabNavigator() {
  yield takeLatest(getActionType(getTabNavigator.request), handleTabNavigator);
}
