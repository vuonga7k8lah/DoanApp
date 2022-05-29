// import fetchAPI from 'utils/functions/fetchAPI';
// import { AxiosResponse } from 'axios';
// import { TabNavigator } from 'models/TabNavigator';
import { takeLatest, put } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';
import { getHeaderNavigator } from '../actions/actionHeaderNavigator';

function* handleHeaderNavigator({ payload: _payload }: ReturnType<typeof getHeaderNavigator.request>) {
  try {
    // const res: AxiosResponse<TabNavigator> = yield call(fetchAPI.request, {
    //   url: payload.endpoint,
    // });
    // console.log(res);
    // yield put(getHeaderNavigator.success(res.data.data));
    yield put(
      getHeaderNavigator.success({
        settings: {
          backgroundColor: '#fff',
          color: '#000',
          statusBarStyle: 'light-content',
        },
        left: [
          {
            id: 'abc',
            type: 'icon',
            enable: true,
            iconName: 'search',
            path: '?post_type=posts&s=',
          },
        ],
        center: [
          {
            id: 'sdf',
            type: 'logo',
            enable: true,
            label: 'Logo',
            uri: 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://vuongkma.codes/wp-content/uploads/2022/04/iconkma.png',
            path: '/',
          },
        ],
        right: [
          {
            id: 'dfgdfg',
            type: 'icon',
            enable: true,
            iconName: 'sunset',
            path: '/pages/contact',
          },
        ],
      }),
    );
  } catch (err) {
    const error = (err as unknown) as any;
    console.log(error.response);
    yield put(getHeaderNavigator.failure('error'));
  }
}

export function* watchHeaderNavigator() {
  yield takeLatest(getActionType(getHeaderNavigator.request), handleHeaderNavigator);
}
