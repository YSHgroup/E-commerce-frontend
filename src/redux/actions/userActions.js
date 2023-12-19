import api from '../../lib/api';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';

export const fetchUserSuccess = (user) => ({
    type: FETCH_USER_SUCCESS,
    payload: user
});

export const fetchUserError = () => ({
    type: FETCH_USER_ERROR,
    payload: []
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
    payload: {}
});

// fetch user data
export const fetchUser = () => {
    return (dispatch) => {
        api()
            .get('/api/v1/user')
            .then((response) => {
                dispatch(fetchUserSuccess(response.data));
            })
            .catch(() => {
                dispatch(fetchUserError());
            });
    };
};
