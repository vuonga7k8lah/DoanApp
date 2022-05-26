import Axios from 'axios';

const url = `https://6001515808587400174da90a.mockapi.io/api/v1/errors`;

export const Debug = (callback: Function) => {
  try {
    return callback();
  } catch (err) {
    const error = (err as unknown) as any;
    Axios.post(url, {
      createdAt: Date.now(),
      name: JSON.stringify({
        name: error.name,
        message: error.message,
      }),
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
};
